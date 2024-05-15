<script lang="ts">
  import { onMount } from "svelte";
  import server from "../../../utils/axios";
  import { goBack } from "../../../utils/router/router";
  import s from "./addestateobject.module.scss";
  import { validate } from "../../../utils/validate";

  export let params: Record<string, string> = {};

  const data = {
    type: { value: "house", error: "" },
    address: { value: "", error: "" },
    area: { value: null, error: "" },
    price: { value: null, error: "" },
    serverError: "",
  };

  const checkData = () => {
    const isValid = validate(data, [
      ["address", "notEmpty"],
      ["area", "notNull"],
      ["price", "notNull"],
    ]);
    data.serverError = data.serverError;
    return isValid;
  };

  onMount(() => {
    if (params.id)
      server.get(`/estateObjects/get/${params.id}`).then((res) => {
        for (const k of Object.keys(data) as (keyof typeof data)[]) {
          if (k == "serverError") continue;
          data[k].value = res.data.data[k];
        }
      });
  });

  const add = () => {
    if (!checkData()) return;
    const Data = Object.fromEntries(Object.entries(data).map((i) => [i[0], (i[1] as any).value]));
    server
      .post("/estateObjects/add", Data)
      .then(() => goBack())
      .catch((e) => (data.serverError = e.response.data.message));
  };

  const edit = () => {
    if (!checkData()) return;
    const Data = Object.fromEntries(Object.entries(data).map((i) => [i[0], (i[1] as any).value]));
    Data.id = params.id;
    server
      .put("/estateObjects/edit", Data)
      .then(() => goBack())
      .catch((e) => (data.serverError = e.response.data.message));
  };
</script>

<div class={s.addestateobject}>
  <h1>{params.id ? "Edit" : "Add"} estate object</h1>
  <form class="form" on:submit|preventDefault={params.id ? edit : add}>
    <label>
      type
      <select bind:value={data.type.value}>
        <option value="house">house</option>
        <option value="apartment">apartment</option>
        <option value="office">office</option>
        <option value="storage">storage</option>
      </select>
      <span>{data.type.error}</span>
    </label>
    <label>
      address
      <input type="text" bind:value={data.address.value} />
      <span>{data.address.error}</span>
    </label>
    <label>
      area
      <input type="text" bind:value={data.area.value} />
      <span>{data.area.error}</span>
    </label>
    <label>
      price
      <input type="text" bind:value={data.price.value} />
      <span>{data.price.error}</span>
    </label>
    <p>{data.serverError}</p>
    <button>CONFIRM</button>
  </form>
</div>
