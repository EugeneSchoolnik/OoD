<script lang="ts">
  import { onMount } from "svelte";
  import Table from "../../components/Table/Table.svelte";
  import { go, link } from "../../utils/router/router";
  import s from "./customers.module.scss";
  import type { ICustomer } from "./types";
  import server from "../../utils/axios";
  import { user } from "../../store/user";

  export let params: Record<string, string> = {};

  let customers: ICustomer[] = [];

  onMount(() => {
    server.get(`/customers${params.id ? "/get/" + params.id : ""}`).then((res) => {
      customers = res.data.data;
      customers = params.id ? ([customers] as any) : customers.reverse();
    });
  });
</script>

<div class={s.customers}>
  <h1>Customers</h1>
  {#if $user.group !== "user"}
    <a class="btn" use:link href="/customers/add">
      <i class="fa-solid fa-circle-plus"></i>
      Add customer
    </a>
  {/if}
  <Table
    titles={[
      ["id", 10],
      ["name", 20],
      ["lastname", 25],
      ["email", 45],
    ]}
    actions={[
      {
        key: "id",
        icon: "fa-solid fa-pen",
        func: (i) => {
          go(`/customers/edit/${i}`);
        },
      },
      {
        key: "id",
        icon: "fa-solid fa-trash",
        func: (i) => {
          const access = confirm("Are you sure you want to delete the record?");
          if (access)
            server.delete(`/customers/remove/${i}`).then(() => {
              customers = customers.filter((v) => v.id !== i);
            });
        },
      },
    ]}
    data={customers}
  />
</div>
