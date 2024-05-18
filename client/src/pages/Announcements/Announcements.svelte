<script lang="ts">
  import { onMount } from "svelte";
  import Table from "../../components/Table/Table.svelte";
  import { go, link } from "../../utils/router/router";
  import s from "./announcements.module.scss";
  import type { IAnnouncement } from "./types";
  import server from "../../utils/axios";
  import { user } from "../../store/user";
  import { createReport } from "../../utils/report";

  export let params: Record<string, string> = {};

  let announcements: IAnnouncement[] = [];

  onMount(() => {
    server.get(`/announcements${params.id ? "/get/" + params.id : ""}`).then((res) => {
      announcements = res.data.data;
      announcements = params.id ? ([announcements] as any) : announcements.reverse();

      announcements = announcements.map((i: any) => {
        i.date = i.date.split("T")[0];
        i.status = !!i.status;
        return i;
      });
    });
  });

  const onReport = () => {
    createReport(
      "Announcements",
      [
        ["id", 20],
        ["id_object", 20],
        ["id_customer", 20],
        ["type", 25],
        ["area", 20],
        ["price", 20],
        ["status", 15],
        ["date", 30],
      ],
      announcements
    );
  };
</script>

<div class={s.announcements}>
  <h1>Announcements</h1>
  {#if $user.group !== "user"}<a class="btn" use:link href="/announcements/add">
      <i class="fa-solid fa-circle-plus"></i>
      Add announcement
    </a>{/if}
  <Table
    titles={[
      ["id", 10],
      ["id_object", 10],
      ["id_customer", 10],
      ["type", 10],
      ["area", 10],
      ["price", 10],
      ["status", 10],
      ["date", 10],
    ]}
    actions={[
      {
        key: "id",
        icon: "fa-solid fa-pen",
        func: (i) => {
          go(`/announcements/edit/${i}`);
        },
      },
      {
        key: "id",
        icon: "fa-solid fa-trash",
        func: (i) => {
          const access = confirm("Are you sure you want to delete the record?");
          if (access)
            server.delete(`/announcements/remove/${i}`).then(() => {
              announcements = announcements.filter((v) => v.id !== i);
            });
        },
      },
    ]}
    data={announcements}
  />
  {#if $user.group !== "user"}
    <button class="btn" on:click={onReport}>Report</button>
  {/if}
</div>
