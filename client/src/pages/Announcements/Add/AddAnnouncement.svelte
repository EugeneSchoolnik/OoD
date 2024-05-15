<script lang="ts">
  import { onMount } from "svelte";
  import s from "./addannouncement.module.scss";
  import server from "../../../utils/axios";
  import { goBack } from "../../../utils/router/router";
  import { validate } from "../../../utils/validate";

  export let params: Record<string, string> = {};

  const data = {
    id_object: { value: "", error: "" },
    id_customer: { value: "", error: "" },
    type: { value: "house", error: "" },
    area: { value: null, error: "" },
    price: { value: null, error: "" },
    status: { value: null, error: "" },
    serverError: "",
  };

  const checkData = () => {
    const isValid = validate(data, [
      ["id_object", "notEmpty"],
      ["id_customer", "notEmpty"],
      ["area", "notNull"],
      ["price", "notNull"],
    ]);
    data.serverError = data.serverError;
    return isValid;
  };

  let customers_id: { id: string; email: string }[] = [];
  let objects_id: { id: string; address: string }[] = [];

  onMount(() => {
    if (params.id)
      server.get(`/announcements/get/${params.id}`).then((res) => {
        for (const k of Object.keys(data) as (keyof typeof data)[]) {
          if (k == "serverError") continue;
          data[k].value = res.data.data[k];
        }
      });
    server.get("/customerRequests/customers").then((res) => {
      customers_id = res.data.data;
    });
    server.get("/announcements/estateObjects").then((res) => {
      objects_id = res.data.data;
    });
  });

  const add = () => {
    if (!checkData()) return;
    const Data = Object.fromEntries(Object.entries(data).map((i) => [i[0], (i[1] as any).value]));
    server
      .post("/announcements/add", Data)
      .then(() => goBack())
      .catch((e) => (data.serverError = e.response.data.message));
  };

  const edit = () => {
    if (!checkData()) return;
    const Data = Object.fromEntries(Object.entries(data).map((i) => [i[0], (i[1] as any).value]));
    Data.id = params.id;
    server
      .put("/announcements/edit", Data)
      .then(() => goBack())
      .catch((e) => (data.serverError = e.response.data.message));
  };
</script>

<div class={s.addannouncement}>
  <h1>{params.id ? "Edit" : "Add"} announcement</h1>
  <form class="form" on:submit|preventDefault={params.id ? edit : add}>
    <label>
      id_object
      <select bind:value={data.id_object.value}>
        {#each objects_id as i (i.id)}
          <option value={i.id}>{i.id}&nbsp; {i.address}</option>
        {/each}
      </select>
      <span>{data.id_object.error}</span>
    </label>
    <label>
      id_customer
      <select bind:value={data.id_customer.value}>
        {#each customers_id as i (i.id)}
          <option value={i.id}>{i.id}&nbsp; {i.email}</option>
        {/each}
      </select>
      <span>{data.id_customer.error}</span>
    </label>
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
      area
      <input type="text" bind:value={data.area.value} />
      <span>{data.area.error}</span>
    </label>
    <label>
      price
      <input type="text" bind:value={data.price.value} />
      <span>{data.price.error}</span>
    </label>
    {#if params.id}
      <label>
        status
        <input type="checkbox" bind:checked={data.status.value} />
        <span>{data.status.error}</span>
      </label>
    {/if}
    <p>{data.serverError}</p>
    <button>CONFIRM</button>
  </form>
</div>
