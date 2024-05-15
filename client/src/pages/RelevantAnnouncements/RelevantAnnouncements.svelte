<script lang="ts">
  import { onMount } from "svelte";
  import Table from "../../components/Table/Table.svelte";
  import s from "./relevantannouncements.module.scss";
  import server from "../../utils/axios";
  import { go } from "../../utils/router/router";

  type relevantAnnouncement = {
    id_announcement: string;
    id_customer: string;
    id_owner: string;
    id_request: string;
  };

  let relevantAnnouncements: relevantAnnouncement[] = [];

  onMount(() => {
    server.get("/announcements/relevant").then((res) => {
      relevantAnnouncements = res.data.data;
      relevantAnnouncements = relevantAnnouncements.map((i) => {
        i.id_announcement = {
          value: i.id_announcement,
          action: () => go(`/announcements/${(i.id_announcement as any).value}`),
        } as any;
        i.id_request = {
          value: i.id_request,
          action: () => go(`/customer_requests/${(i.id_request as any).value}`),
        } as any;
        i.id_owner = {
          value: i.id_owner,
          action: () => go(`/customers/${(i.id_owner as any).value}`),
        } as any;
        i.id_customer = {
          value: i.id_customer,
          action: () => go(`/customers/${(i.id_customer as any).value}`),
        } as any;
        return i;
      }) as any;
    });
  });
</script>

<div class={s.relevantannouncements}>
  <h1>Relevant announcements</h1>
  <Table
    titles={[
      ["id_announcement", 10],
      ["id_customer_request", 10],
      ["owner_id", 10],
      ["customer_id", 10],
    ]}
    data={relevantAnnouncements}
  />
</div>
