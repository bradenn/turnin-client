<template>
  <div>
    <b-container class="mt-3">
      <b-row>

        <b-col cols="8">
          <b-button-toolbar class="mb-2" size="sm">
            <b-button size="sm" @click="back" class="mr-1">
              <b-icon-arrow-left scale="1"></b-icon-arrow-left>
            </b-button>
          </b-button-toolbar>
        </b-col>
        <b-col cols="8">
          <t-card :title="result.test.name" subtitle="The following results to your previous submission">
            <template slot="body">
              <b-form-group label="Stdout" description="">
                <codemirror :options="options" :value="result.diffout.join('\n')">
                </codemirror>
              </b-form-group>
              <b-form-group label="Stderr">
                <codemirror :options="options" :value="result.differr.join('\n')">
                </codemirror>
              </b-form-group>
              <b-card-body>
                <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a>
              </b-card-body>
              <codemirror :options="options" :value="JSON.stringify(result)">
              </codemirror>
              <b-card-footer>This is a footer</b-card-footer>
              {{ result }}
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

const GET_RESULT =
    gql`query result($resultId: ObjectId!){
          result(resultId: $resultId){

            passed,
            leak {
                _id
            },
            timeout,
                test {
                    name,
                    exit
                },
                diffout,
                differr,
                memory
                exit,
                duration,
                stdout,
                stderr,


          }
        }`;


export default {
  name: 'Submit',
  components: {TCard},
  data() {
    return {
      options: {
        tabSize: 4,
        mode: 'text/x-diff',
        theme: 'one-dark',
        lineNumbers: true,
        line: true,
        readOnly: true
      },
      result: {},
      loading: {
        page: false,
        uploadFiles: false,
      },
      error: "",
      show: false
    }
  },
  mounted() {
  },
  apollo: {
    result: {
      query: GET_RESULT,
      loadingKey: 'loading',
      variables() {
        return {
          resultId: this.$route.params.resultId
        }
      }
    },
  },
  methods: {
    back: function () {
      this.$router.back()
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
