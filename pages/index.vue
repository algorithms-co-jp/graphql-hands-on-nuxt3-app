<template>
  <!-- タスクのリスト表示エリア -->
  <div v-if="result.fetching" class="p-6 bg-gray-100 min-h-screen">
    <!-- 各タスクの詳細とコメントエリア -->
    <div v-for="task in data.tasks" v-bind:key="task.id" class="mb-4 bg-white p-4 rounded shadow">
      <!-- タスクの詳細情報表示部分 -->
      <h2 class="text-xl font-bold mb-2">{{ task.id }} - {{ task.title }}</h2>
      <h3 class="text-gray-700 mb-1">{{ task.body }}</h3>
      <p class="text-gray-500 text-sm">{{ formatDateToJST(task.created_at) }}</p>
      <!-- タスクの完了/未完了表示部分 -->
      <p class="mt-2">
        ステータス:
        <span v-if="task.completed" class="text-green-500">完了済み</span>
        <span v-else class="text-red-500">未完了</span>
      </p>
      <!-- タスクの完了/未完了を切り替えるボタン -->
      <button @click="toggleCompleted(task)" class="mt-2 p-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
        {{ task.completed ? '未完了にする' : '完了済みにする' }}
      </button>
      <!-- タスクを削除するボタン -->
      <button @click="deleteTask(task.id)" class="mt-2 p-1 bg-red-500 text-white rounded hover:bg-red-600 mx-3">
        タスクを削除
      </button>
      <!-- タスクに関するコメントエリア -->
      <div class="mt-4">
        <h4 class="text-lg font-medium mb-2">コメント:</h4>
        <!-- 既存のコメントを表示 -->
        <div v-for="comment in task.tasks_comments" :key="comment.id" class="mb-2 p-2 bg-gray-100 rounded">
          {{ comment.option }} - <span class="text-gray-500 text-sm">{{ formatDateToJST(comment.created_at) }}</span>
        </div>
        <!-- 新しいコメントを追加する入力とボタン -->
        <div class="mt-2">
          <input v-model="task.newComment" placeholder="新しいコメントを入力" class="w-full p-2 mb-2 border rounded" />
          <button @click="addComment(task)" class="p-1 bg-green-500 text-white rounded hover:bg-green-600">コメントを追加</button>
        </div>
      </div>
    </div>
    <!-- 新しいタスクを追加するフォーム -->
    <div class="mt-8 bg-white p-6 rounded shadow">
      <input v-model="title" placeholder="タイトルを入力" class="w-full p-2 mb-4 border rounded" />
      <textarea v-model="body" placeholder="本文を入力" rows="4" class="w-full p-2 mb-4 border rounded"></textarea>
      <button @click="addTask" class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">タスクを追加</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { gql, useQuery, useMutation } from '@urql/vue';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

// タスクのリストを取得するクエリ
const result = await useQuery({
  query: gql`
    {
      tasks(limit: 100, order_by: {id: asc}) {
        id
        title
        body
        completed
        created_at
        tasks_comments(order_by: {id: asc}) {
          id
          option
          created_at
        }
      }
    }
  `
});

// タスクとコメントのデータを保持するref
const data = ref(result.data);

// タスクを追加するためのミューテーション
const ADD_TASK = gql`
  mutation insertTask($title: String!, $body: String!) {
    insert_tasks_one(object: { title: $title, body: $body }) {
      id
    }
  }
`;

// コメントを追加するためのミューテーション
const ADD_COMMENT = gql`
  mutation insertComment($option: String, $task_id: Int) {
    insert_comments_one(object: {option: $option, task_id: $task_id}) {
      id
    }
  }
`;

// タスクの完了/未完了を切り替えるためのミューテーション
const UPDATE_TASK = gql`
  mutation updateTask($id: Int!, $completed: Boolean!) {
    update_tasks_by_pk(pk_columns: { id: $id }, _set: { completed: $completed }) {
      id
    }
  }
`;

// Todo: タスクを削除するためのミューテーション
const DELETE_TASK = gql`

`;

// ミューテーションを実行するための関数
const { executeMutation: executeAddTask } = useMutation(ADD_TASK);
const { executeMutation: executeAddComment } = useMutation(ADD_COMMENT);
const { executeMutation: executeUpdateTask } = useMutation(UPDATE_TASK);

// 新しいタスクのタイトルと本文を保持するref
const title = ref("");
const body = ref("");

// 新しいタスクを追加する関数
const addTask = async () => {
  await executeAddTask({ title: title.value, body: body.value });
  title.value = "";
  body.value = "";
  result.executeQuery({ requestPolicy: 'network-only'});
};

// タスクに新しいコメントを追加する関数
const addComment = async (task) => {
  if (!task.newComment) return;
  await executeAddComment({ option: task.newComment, task_id: task.id });
  task.newComment = "";
  result.executeQuery({ requestPolicy: 'network-only'});
};

// タスクの完了/未完了を切り替える関数
const toggleCompleted = async (task) => {
  const updatedStatus = !task.completed;
  await executeUpdateTask({ id: task.id, completed: updatedStatus });
  task.completed = updatedStatus;
  result.executeQuery({ requestPolicy: 'network-only'});
};

// Todo: タスクを削除する関数
const deleteTask = async (taskId) => {

};

// 日本時間に変換する関数
const JST = 'Asia/Tokyo';
const formatDateToJST = (dateString) => {
  const dateInJST = utcToZonedTime(dateString, JST);
  return format(dateInJST, 'yyyy年M月d日H:mm');
};
</script>
