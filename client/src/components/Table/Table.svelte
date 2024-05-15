<script lang="ts">
  import { user } from "../../store/user";
  import s from "./table.module.scss";

  type action = { key: string; icon: string; func: (v: any) => void };

  export let actions: action[] = [];
  export let titles: [string, number][];
  export let data: Record<string, any>[];
</script>

<div class={s.table}>
  <table>
    <tbody>
      <tr>
        {#each titles as i}
          <th style={`width: ${i[1]}%`}>
            {i[0]}
          </th>
        {/each}
      </tr>
      {#each data as i, ind (i.id || ind)}
        <tr>
          {#each Object.keys(i) as k, idx}
            <td on:click={() => (typeof i[k] == "object" ? i[k].action(i[k].value) : null)}>
              {typeof i[k] == "number" ? i[k].toFixed(2) : typeof i[k] == "object" ? i[k].value : i[k]}
              {#if idx == 0}
                {#if $user.group == "admin" && actions.length}
                  <div class={s.actions}>
                    {#each actions as a (a.icon)}
                      <i
                        class={a.icon}
                        on:click={() => {
                          a.func(i[a.key]);
                        }}
                      ></i>
                    {/each}
                  </div>
                {/if}
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
