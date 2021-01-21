<template>
  <div>
    <b-container class="mt-3">
      <b-row>
        <b-col cols="8">
          <t-card :title="file.name"
                  :subtitle="`${parseSize(body.length)}, created  by ${file.owner.fullName} (${file.owner.username})`">
            <template slot="body">
              <b-aspect aspect="8.5:11">
                <code>{{ body }}</code>
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
      file: {},
      body: "",
      loading: 0,
      error: "",
      show: false
    }
  },
  mounted() {
    this.downloadFile()
  },
  apollo: {
    file: {
      query: GET_FILE,
      loadingKey: 'loading',
      variables() {
        return {
          fileId: this.$route.params.fileId
        }
      }
    },
  },
  methods: {
    downloadFile() {
      this.$http.get(this.file.link).then(data => {
        this.body = data.data
      })
    },
    join: function (array) {
      return array.join("/n")
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
<style scoped>
hr {
  margin-top: 2em;
  margin-bottom: 2em;
}
</style>
