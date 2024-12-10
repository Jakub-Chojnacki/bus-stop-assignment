<template>
  <div class="nav-wrapper">
    <nav>
      <RouterLink to="/" activeClass="active-route">Bus Lines</RouterLink>
      <RouterLink to="/stops" activeClass="active-route">Stops</RouterLink>
    </nav>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.nav-wrapper {
  --nav-inactive-link-color: var(--secondary-color);
  --nav-spacing: 1.25rem;
  --nav-link-font-size: 0.875rem;
  --nav-line-height: calc(
    var(--nav-spacing) + 1rem - var(--nav-link-font-size)
  );

  background-color: white;
  height: 4rem;
  display: flex;
  align-items: center;
  padding-inline: 1.5rem;
  margin-bottom: 1rem;
  border-radius: var(--base-border-radius);

  nav {
    display: flex;
    gap: 1rem;
    align-items: baseline;
    min-height: 100%;
    padding: var(--nav-spacing) 0 0;
  }

  a {
    color: var(--nav-inactive-link-color);
    text-decoration: none;
    line-height: var(
      --nav-line-height
    ); //it will be automatically calculated to be pixel perfect when you change font-size or padding
    font-size: 0.875rem;
    padding-inline: 1.5rem;
    padding-bottom: var(--nav-spacing);
  }

  .active-route {
    color: var(--active-link-color);
    border-bottom: 2px solid var(--accent-color);
  }
}
</style>
