<script>
  import Button from "../components/Forms/Button.svelte";
  import ButtonGroup from "../components/Forms/ButtonGroup.svelte";
  import { checkBrowser } from "../utils";

  import moment from "moment";

  import Modal from "./Modal.svelte";
  import Select from "../components/Forms/Select.svelte";

  let show = !checkBrowser();
  let daysIgnored;

  let options = [
    {
      value: 0,
      text: "This session",
    },
    {
      value: 1,
      text: "1 day",
    },
    {
      value: 2,
      text: "2 days",
    },
    {
      value: 3,
      text: "3 days",
    },
    {
      value: 5,
      text: "5 days",
    },
    {
      value: 7,
      text: "7 days",
    },
  ];

  const updateIgnoreCookie = () => {
    let date = moment();
    console.log(date);
    console.log(daysIgnored);
  };
</script>

<Modal bind:show>
  <h4 slot="header">Your Browser Choice</h4>
  <p>
    We respect your Browser Choice. But we kindly request for you to use the
    desktop Apps or use the Brave Browser!
  </p>
  <p>
    For more information regarding browser choice and/or downloads, check out
    the <a href="https://www.omniawrite.com/get-started/">Get Started</a> page of
    our website.
  </p>
  <form on:submit|preventDefault={updateIgnoreCookie()}>
    <Select label="Days" bind:options bind:value={daysIgnored} />
    <ButtonGroup>
      <Button on:click={updateIgnoreCookie}>Update</Button>
    </ButtonGroup>
  </form>
</Modal>
