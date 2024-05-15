<script lang="ts">
  import { onMount } from "svelte";
  import { user } from "../../store/user";
  import server from "../../utils/axios";
  import { go } from "../../utils/router/router";
  import s from "./login.module.scss";

  const data = {
    group: "manager",
    password: "",
    serverError: "",
  };

  const login = () => {
    if (!data.password) return (data.serverError = "Password can't be empty");
    data.serverError = "";

    server
      .post("/auth/login", data)
      .then((res) => {
        user.set(res.data);
        go("/");
      })
      .catch((e) => (data.serverError = e.response.data.message));
  };

  onMount(() => {
    server.get("/auth/logout").then(() => user.set({ group: "user" }));
  });
</script>

<div class={s.login}>
  <h1>Login</h1>
  <form class="form" on:submit|preventDefault={login}>
    <label>
      Group
      <select bind:value={data.group}>
        <option value="manager">manager</option>
        <option value="admin">admin</option>
      </select>
    </label>
    <label>
      Password
      <input type="password" bind:value={data.password} />
    </label>
    <p>{data.serverError}</p>
    <button>Login</button>
  </form>
</div>
