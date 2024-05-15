<script lang="ts">
  import { onMount } from "svelte";
  import s from "./app.module.scss";
  import AddAnnouncement from "./pages/Announcements/Add/AddAnnouncement.svelte";
  import Announcements from "./pages/Announcements/Announcements.svelte";
  import AddCustomerRequest from "./pages/CustomerRequests/Add/AddCustomerRequest.svelte";
  import CustomerRequests from "./pages/CustomerRequests/CustomerRequests.svelte";
  import AddCustomer from "./pages/Customers/Add/AddCustomer.svelte";
  import Customers from "./pages/Customers/Customers.svelte";
  import AddEstateObject from "./pages/EstateObjects/Add/AddEstateObject.svelte";
  import EstateObjects from "./pages/EstateObjects/EstateObjects.svelte";
  import Home from "./pages/Home/Home.svelte";
  import RelevantAnnouncements from "./pages/RelevantAnnouncements/RelevantAnnouncements.svelte";
  import Route from "./utils/router/Route.svelte";
  import RouterView from "./utils/router/RouterView.svelte";
  import server from "./utils/axios";
  import { user } from "./store/user";
  import Login from "./pages/Login/Login.svelte";
  import navigation from "./utils/navigation";

  onMount(() => {
    server.get("/auth").then((res) => {
      user.set(res.data);
    });
    navigation();
  });
</script>

<main class={s.app}>
  <Route path="/login" element={Login} />
  <Route path="/" element={Home} />
  <Route
    path="/customers"
    element={Customers}
    children={[
      { path: "/add", element: AddCustomer },
      { path: "/edit/:id", element: AddCustomer },
      { path: "/:id", element: Customers },
    ]}
  />
  <Route
    path="/estate_objects"
    element={EstateObjects}
    children={[
      { path: "/add", element: AddEstateObject },
      { path: "/edit/:id", element: AddEstateObject },
    ]}
  />
  <Route
    path="/customer_requests"
    element={CustomerRequests}
    children={[
      { path: "/add", element: AddCustomerRequest },
      { path: "/edit/:id", element: AddCustomerRequest },
      { path: "/:id", element: CustomerRequests },
    ]}
  />
  <Route
    path="/announcements"
    element={Announcements}
    children={[
      { path: "/add", element: AddAnnouncement },
      { path: "/edit/:id", element: AddAnnouncement },
      { path: "/:id", element: Announcements },
    ]}
  />
  <Route path="/relevant_announcements" element={RelevantAnnouncements} />
  <RouterView />
</main>
