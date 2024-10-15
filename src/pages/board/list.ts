import axios from "axios";

// 게시글 목록 조회
async function getList() {
  const res = await axios.get("https://11.fesp.shop/posts", {
    params: {
      type: "test",
    },
  });
  return res.data;
}

// 게시글 출력
async function renderList() {
  const list = getList();
  if (!list) {
    return;
  }

  const { item } = await getList();

  type Post = {
    _id: string;
    title: string;
    user: {
      _id: string;
      name: string;
    };
    content: string;
    views: number;
    createdAt: string;
  };

  const postList = item.map((post: Post) => {
    return `
      <li>
        <h2>${post._id}. ${post.title}</h2>
        <span>조회수: ${post.views} </span>
        <time>날짜: ${post.createdAt}</time>        
        <p>${post.content}</p>
      </li>
      <hr />`;
  });

  const listElement = document.querySelector("#postList") as HTMLElement;
  listElement.innerHTML = postList.join("");
}

renderList();
