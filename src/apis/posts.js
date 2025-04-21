const API_URL = "https://jsonplaceholder.typicode.com/posts";

// 포스트 불러오기
export async function getAllPosts() {
  const res = await fetch(API_URL);
  return res.json();
}

// 포스트 Id 별 상세 페에지 불러오기
export async function getPostById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

// 새로운 데이터 추가
export async function createPost(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

// 수정
export async function updatePost(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

// 삭제
export async function deletePost(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
