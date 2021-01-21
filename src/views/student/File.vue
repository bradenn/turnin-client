<template>
  <div>
    <b-container class="mt-3">
      <b-row>
        <b-col cols="9">
          <div class="mb-2">
            <b-button-toolbar aria-label="Toolbar with button groups and input groups">

              <b-button size="sm" @click="back" class="mr-1">
                <b-icon-arrow-left scale="1"></b-icon-arrow-left>
              </b-button>
              <b-button-group size="sm" class="mr-1">
                <b-button :href="file.link" target="_blank">View Raw</b-button>
                <b-button @click="generateDownload">Download</b-button>
              </b-button-group>
              <b-button-group size="sm" class="mr-1">
                <b-button @click="changeFontSize(-1)">
                  <b-icon-fonts scale="0.5"></b-icon-fonts>
                </b-button>
                <b-button @click="changeFontSize(1)">
                  <b-icon-fonts scale="1"></b-icon-fonts>
                </b-button>
              </b-button-group>
            </b-button-toolbar>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="9">
          <t-card :title="file.name"
                  :subtitle="`${parseSize(body.length)}, created  by ${file.owner.fullName} (${file.owner.username})`">
            <template slot="body">
              <b-aspect aspect="8.5:11" v-bind:style="{ fontSize: fontPreference }">
                <codemirror v-model="body" :options="options">

                </codemirror>
              </b-aspect>
            </template>
          </t-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import TCard from "@/components/tCard";

const GET_FILE =
    gql`query file($fileId: ObjectId!){
          file(fileId: $fileId){
            _id,
            owner {
                _id,
                fullName,
                username
            },
            name,
            link
          }
        }`;

export default {
  name: 'File',
  components: {TCard},
  data() {

    return {
      file: {owner: {fullName: "", username: ""}},
      body: "",
      fontPreference: 12,
      loading: 0,
      options: {
        tabSize: 4,
        mode: 'text/x-c++src',
        theme: 'one-dark',
        lineNumbers: true,
        line: true,

        readOnly: true
      },
      error: "",
      show: false
    }
  },
  apollo: {
    file: {
      query: GET_FILE,
      loadingKey: 'loading',
      variables() {
        return {
          fileId: this.$route.params.fileId
        }
      },
      result() {
        this.downloadFile()
      },
    },
  },
  methods: {
    back: function () {
      this.$router.back()
    },
    changeFontSize(delta) {
      this.fontPreference += delta;
    },
    downloadFile() {
      console.log(this.file.link)
      this.$http.get(this.file.link)
          .then(data => {
            this.body = data.data
          })
          .catch(err => {
            console.log(err)
          })
    },
    generateDownload() {
      const url = window.URL.createObjectURL(new Blob([this.body]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', this.file.name) //or any other extension
      document.body.appendChild(link)
      link.click()
    },
    parseSize: function formatBytes(a, b = 2) {
      if (0 === a) return "0 Bytes";
      const c = 0 > b ? 0 : b, d = Math.floor(Math.log(a) / Math.log(1024));
      return parseFloat((a / Math.pow(1024, d)).toFixed(c)) + " " + ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.CodeMirror {
  height: auto !important;
}
</style>
