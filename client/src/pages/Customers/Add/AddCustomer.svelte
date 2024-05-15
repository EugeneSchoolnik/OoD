<script lang="ts">
  import { onMount } from "svelte";
  import s from "./addcustomer.module.scss";
  import server from "../../../utils/axios";
  import { goBack } from "../../../utils/router/router";
  import { validate } from "../../../utils/validate";

  export let params: Record<string, string> = {};

  const data = {
    name: { value: "", error: "" },
    lastname: { value: "", error: "" },
    email: { value: "", error: "" },
    serverError: "",
  };

  const checkData = () => {
    const isValid = validate(data, [
      ["name", "notEmpty"],
      ["lastname", "notEmpty"],
      ["email", "email"],
    ]);
    data.serverError = data.serverError;
    return isValid;
  };

  const add = () => {
    if (!checkData()) return;
    const Data = Object.fromEntries(Object.entries(data).map((i) => [i[0], (i[1] as any).value]));
    server
      .post("/customers/add", Data)
      .then(() => goBack())
      .catch((e) => (data.serverError = e.response.data.message));
  };

  const edit = () => {
    if (!checkData()) return;
    const Data = Object.fromEntries(Object.entries(data).map((i) => [i[0], (i[1] as any).value]));
    Data.id = params.id;
    server
      .put("/customers/edit", Data)
      .then(() => goBack())
      .catch((e) => (data.serverError = e.response.data.message));
  };

  onMount(() => {
    if (params.id)
      server.get(`/customers/get/${params.id}`).then((res) => {
        for (const k of Object.keys(data) as (keyof typeof data)[]) {
          if (k == "serverError") continue;
          data[k].value = res.data.data[k];
        }
      });
  });
</script>

<div class={s.addcustomer}>
  <h1>{params.id ? "Edit" : "Add"} customer</h1>
  <form class="form" on:submit|preventDefault={params.id ? edit : add}>
    <label>
      name
      <input type="text" bind:value={data.name.value} />
      <span>{data.name.error}</span>
    </label>
    <label>
      lastname
      <input type="text" bind:value={data.lastname.value} />
      <span>{data.lastname.error}</span>
    </label>
    <label>
      email
      <input type="email" bind:value={data.email.value} />
      <span>{data.email.error}</span>
    </label>
    <p>{data.serverError}</p>
    <button>CONFIRM</button>
  </form>
</div>
