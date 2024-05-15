<script lang="ts">
  import { user } from "../../store/user";
  import { link } from "../../utils/router/router";
  import s from "./home.module.scss";
</script>

<div class={s.home}>
  <h1>Automated workstation for a real estate specialist</h1>
  <ul>
    <li>
      <a use:link href="/customers" class="btn">
        <i class="fa-solid fa-users"></i>
        Customers
      </a>
    </li>
    <li>
      <a use:link href="/estate_objects" class="btn">
        <i class="fa-solid fa-house"></i>
        Estate objects
      </a>
    </li>
    <li>
      <a use:link href="/customer_requests" class="btn">
        <i class="fa-solid fa-person-circle-question"></i>
        Customer requests
      </a>
    </li>
    <li>
      <a use:link href="/announcements" class="btn">
        <i class="fa-solid fa-bullhorn"></i>
        Announcements
      </a>
    </li>
    <hr />
    <li>
      <a use:link href="/relevant_announcements" class="primary btn">
        <i class="fa-solid fa-person-circle-check"></i>
        Relevant announcements
      </a>
    </li>
    <li>
      <a use:link href="/login" class="primary btn">
        <i class="fa-solid fa-right-to-bracket"></i>
        Authorization: {$user.group}
      </a>
    </li>
  </ul>
</div>
