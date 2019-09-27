<script>
  import HeaderComponent from "./shared/Header.svelte";
  import SidebarComponent from "./shared/Sidebar.svelte";

  let sidebarState = false;
  let navigationState = false;
</script>

<style>

</style>

<div class="container">
  <HeaderComponent
    bind:navigationState
    on:openSidebar={() => (sidebarState = true)} />

  <SidebarComponent bind:sidebarState />
  <div class="content">
    <div class="inner">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, reiciendis
        eius? Iusto iste pariatur voluptates at sequi similique, itaque ipsam
        voluptas molestias id? Aperiam ab dolore optio, quia repellat quidem.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, reiciendis
        eius? Iusto iste pariatur voluptates at sequi similique, itaque ipsam
        voluptas molestias id? Aperiam ab dolore optio, quia repellat quidem.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, reiciendis
        eius? Iusto iste pariatur voluptates at sequi similique, itaque ipsam
        voluptas molestias id? Aperiam ab dolore optio, quia repellat quidem.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, reiciendis
        eius? Iusto iste pariatur voluptates at sequi similique, itaque ipsam
        voluptas molestias id? Aperiam ab dolore optio, quia repellat quidem.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, reiciendis
        eius? Iusto iste pariatur voluptates at sequi similique, itaque ipsam
        voluptas molestias id? Aperiam ab dolore optio, quia repellat quidem.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, reiciendis
        eius? Iusto iste pariatur voluptates at sequi similique, itaque ipsam
        voluptas molestias id? Aperiam ab dolore optio, quia repellat quidem.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, reiciendis
        eius? Iusto iste pariatur voluptates at sequi similique, itaque ipsam
        voluptas molestias id? Aperiam ab dolore optio, quia repellat quidem.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, reiciendis
        eius? Iusto iste pariatur voluptates at sequi similique, itaque ipsam
        voluptas molestias id? Aperiam ab dolore optio, quia repellat quidem.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, reiciendis
        eius? Iusto iste pariatur voluptates at sequi similique, itaque ipsam
        voluptas molestias id? Aperiam ab dolore optio, quia repellat quidem.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, reiciendis
        eius? Iusto iste pariatur voluptates at sequi similique, itaque ipsam
        voluptas molestias id? Aperiam ab dolore optio, quia repellat quidem.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, reiciendis
        eius? Iusto iste pariatur voluptates at sequi similique, itaque ipsam
        voluptas molestias id? Aperiam ab dolore optio, quia repellat quidem.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, reiciendis
        eius? Iusto iste pariatur voluptates at sequi similique, itaque ipsam
        voluptas molestias id? Aperiam ab dolore optio, quia repellat quidem.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, reiciendis
        eius? Iusto iste pariatur voluptates at sequi similique, itaque ipsam
        voluptas molestias id? Aperiam ab dolore optio, quia repellat quidem.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, reiciendis
        eius? Iusto iste pariatur voluptates at sequi similique, itaque ipsam
        voluptas molestias id? Aperiam ab dolore optio, quia repellat quidem.
      </p>

    </div>
  </div>
</div>
