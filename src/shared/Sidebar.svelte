<script>
  export let sidebarState;
</script>

<div id="sidebar" class="navigation" class:active={sidebarState}>
  <ul class="menu">
    <div class="backdrop" on:click={() => (sidebarState = false)} />
    <a
      id="close-sidebar"
      href="#"
      class="close"
      on:click={() => (sidebarState = false)}>
      <i class="icon icon-close" />
    </a>
    <li class="parent open">
      <a class="key" href="#">
        Chapter 1
        <i class="icon icon-caret collapse" />
      </a>
      <ul>
        <li>
          <a href="#">Scene I</a>
        </li>
        <li class="active">
          <a href="#">Scene II</a>
        </li>
        <li>
          <a href="#">Scene III</a>
        </li>
      </ul>
    </li>
    <li class="parent">
      <a class="key" href="#">
        Chapter 2
        <i class="icon icon-caret collapse" />
      </a>
      <ul>
        <li>
          <a href="#">Scene I</a>
        </li>
        <li>
          <a href="#">Scene II</a>
        </li>
        <li>
          <a href="#">Scene III</a>
        </li>
      </ul>
    </li>
  </ul>
</div>
