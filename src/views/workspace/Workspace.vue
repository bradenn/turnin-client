<template>
  <div>
    <b-container class="mt-3">
      <b-form-row>

        <b-col cols="9">
          <b-button-toolbar class="mb-2">
            <b-button-group size="sm" class="mr-1">
              <b-dropdown text="Roboto Mono" size="sm">
                <b-dropdown-item class="menu-item jetbrains-mono">JetBrains Mono</b-dropdown-item>
                <b-dropdown-item class="menu-item menlo">Menlo</b-dropdown-item>
                <b-dropdown-item class="menu-item fira">Fira Code</b-dropdown-item>
              </b-dropdown>
            </b-button-group>
            <b-button-group size="sm">
              <b-button>
                <b-icon-check-all></b-icon-check-all>
              </b-button>
              <b-button>
                <b-icon-play-fill></b-icon-play-fill>
              </b-button>
            </b-button-group>
          </b-button-toolbar>
          <t-card>
            <template slot="body">
              <b-aspect aspect="8.5:11">
                <div class="d-flex justify-content-start">
                  <div class="editor-tab">main.cpp</div>
                  <div class="editor-tab">dstack.cpp</div>
                  <div class="editor-tab">dstack.h</div>
                </div>
                <codemirror v-model="body" :options="options">

                </codemirror>
              </b-aspect>
            </template>
          </t-card>
        </b-col>
      </b-form-row>
    </b-container>
  </div>
</template>

<script>
/*import gql from 'graphql-tag'*/


import TCard from "@/components/tCard";

export default {
  name: 'Workspace',
  components: {TCard},
  data() {
    return {
      body: "",
      fontPreference: 12,
      loading: 0,
      options: {
        tabSize: 4,
        mode: 'text/x-c++src',
        theme: 'one-dark',
        lineNumbers: true,
        line: true,
      },
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.editor-tab {
  padding: 0.25em 1em !important;
  border: var(--border);
}


.menu-item {
  font-size: 12px;
  border-bottom: 1px;
}

.menu-item:hover {

}


.jetbrains-mono {
  font-family: "JetBrains Mono", monospace;
}

.menlo {
  font-family: Menlo, Consolas, Menlo, Monaco, monospace;
}

.fira {
  font-family: "Fira Code", monospace;
}


</style>
