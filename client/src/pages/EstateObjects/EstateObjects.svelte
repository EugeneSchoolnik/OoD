<script lang="ts">
  import { onMount } from "svelte";
  import Table from "../../components/Table/Table.svelte";
  import { go, link } from "../../utils/router/router";
  import s from "./estateobjects.module.scss";
  import server from "../../utils/axios";
  import type { IEstateObject } from "./types";
  import { user } from "../../store/user";
  import { createReport } from "../../utils/report";

  let estateObjects: IEstateObject[] = [];

  onMount(() => {
    server.get("/estateObjects").then((res) => {
      estateObjects = res.data.data.reverse();
    });
  });

  const onReport = () => {
    createReport(
      "Estate_objects",
      [
        ["id", 20],
        ["name", 20],
        ["address", 80],
        ["area", 20],
        ["price", 20],
      ],
      estateObjects
    );
  };
</script>

<div class={s.estateobjects}>
  <h1>Estate Objects</h1>
  {#if $user.group !== "user"}<a class="btn" use:link href="/estate_objects/add">
      <i class="fa-solid fa-circle-plus"></i>
      Add estate object
    </a>{/if}
  <Table
    titles={[
      ["id", 10],
      ["type", 20],
      ["address", 50],
      ["area", 10],
      ["price", 10],
    ]}
    actions={[
      {
        key: "id",
        icon: "fa-solid fa-pen",
        func: (i) => {
          go(`/estate_objects/edit/${i}`);
        },
      },
      {
        key: "id",
        icon: "fa-solid fa-trash",
        func: (i) => {
          const access = confirm("Are you sure you want to delete the record?");
          if (access)
            server.delete(`/estateObjects/remove/${i}`).then(() => {
              estateObjects = estateObjects.filter((v) => v.id !== i);
            });
        },
      },
    ]}
    data={estateObjects}
  />
  {#if $user.group !== "user"}
    <button class="btn" on:click={onReport}>Report</button>
  {/if}
</div>
