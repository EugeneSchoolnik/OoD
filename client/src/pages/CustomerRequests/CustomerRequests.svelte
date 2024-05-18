<script lang="ts">
  import { onMount } from "svelte";
  import Table from "../../components/Table/Table.svelte";
  import { go, link } from "../../utils/router/router";
  import s from "./customerrequests.module.scss";
  import type { ICustomerRequest } from "./types";
  import server from "../../utils/axios";
  import { user } from "../../store/user";
  import { createReport } from "../../utils/report";

  export let params: Record<string, string> = {};

  let customerRequests: ICustomerRequest[] = [];

  onMount(() => {
    server.get(`/customerRequests${params.id ? "/get/" + params.id : ""}`).then((res) => {
      customerRequests = res.data.data;
      customerRequests = params.id ? ([customerRequests] as any) : customerRequests.reverse();
    });
  });

  const onReport = () => {
    createReport(
      "Customer_requests",
      [
        ["id", 20],
        ["id_customer", 20],
        ["type", 25],
        ["area", 25],
        ["min_price", 20],
        ["max_price", 20],
      ],
      customerRequests
    );
  };
</script>

<div class={s.customerrequests}>
  <h1>Customer requests</h1>
  {#if $user.group !== "user"}<a class="btn" use:link href="/customer_requests/add">
      <i class="fa-solid fa-circle-plus"></i>
      Add customer request
    </a>{/if}
  <Table
    titles={[
      ["id", 10],
      ["id_customer", 10],
      ["type", 10],
      ["area", 10],
      ["min_price", 10],
      ["max_price", 10],
    ]}
    actions={[
      {
        key: "id",
        icon: "fa-solid fa-pen",
        func: (i) => {
          go(`/customer_requests/edit/${i}`);
        },
      },
      {
        key: "id",
        icon: "fa-solid fa-trash",
        func: (i) => {
          const access = confirm("Are you sure you want to delete the record?");
          if (access)
            server.delete(`/customerRequests/remove/${i}`).then(() => {
              customerRequests = customerRequests.filter((v) => v.id !== i);
            });
        },
      },
    ]}
    data={customerRequests}
  />
  {#if $user.group !== "user"}
    <button class="btn" on:click={onReport}>Report</button>
  {/if}
</div>
