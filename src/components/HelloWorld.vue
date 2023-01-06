<template>
  <v-row>
    <v-col cols="12" sm="12" md="12">
      <v-container fluid class="mb-7">
        <div class="mb-5">
          <p class="headline font-weight-bold">Import Data Anggota</p>
          <v-divider class="mt-6 mb-6 divider-color" />
        </div>
        <v-card raised class="mx-auto pa-5 card-custom-rounded-10">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1"
                >Form Import Data Anggota</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-container fluid>
            <v-form
              id="tambah-group-form"
              ref="form"
              v-model="valid"
              lazy-validation
              @submit.prevent="onSubmit()"
              class="mt-4"
            >
              <v-container fluid>
                <v-row>
                  <v-col cols="12" sm="12">
                    <v-file-input
                      v-model="file"
                      counter
                      :rules="fileRules"
                      label="File input"
                      placeholder="Select your files"
                      prepend-icon="attach_file"
                      :show-size="1000"
                      :accept="acceptFile"
                    >
                      <template v-slot:selection="{ text }">
                        <v-chip label small>
                          {{ text }}
                        </v-chip>
                      </template>
                      <template v-slot:append-outer>
                        <GeneralTooltip position="left" :textList="textList" />
                      </template>
                    </v-file-input>
                  
                  </v-col>
                </v-row>
                
                
                
                
                
                
                
                
                <v-row class="mt-5">
                  <v-btn
                    :disabled="formLoading"
                    @click="$router.back()"
                    color="default"
                    class="px-10 mr-5"
                  >
                    <v-icon left>keyboard_arrow_left</v-icon>
                    BACK
                  </v-btn>
                  <v-btn
                    :loading="formLoading"
                    :disabled="!valid || !isFullAccess || formLoading"
                    type="submit"
                    color="primary"
                    class="px-10"
                    form="tambah-group-form"
                  >
                    SUBMIT
                    <v-icon right>send</v-icon>
                  </v-btn>
                </v-row>
              </v-container>
            </v-form>
          </v-container>
        </v-card>
      </v-container>
    </v-col>
  </v-row>
</template>
<script>
import ImportMemberService from "@/services/resources/import-member.service";
import MemberService from "@/services/resources/member.service";
import ReasonService from "@/services/resources/master-reason.service";
const GeneralTooltip = () => import("@/components/Tooltip/General");
import { ACCEPT_IMPORT } from "@/common/constant";

export default {
  components: {
    GeneralTooltip
  },
  data() {
    return {
      id: this.$route.query ? this.$route.query.id : null,
      valid: false,
      formLoading: false,
      loadingCardReason: false,
      isCardReason: false,

      // List Item
      

      // Form
      file: null,

      // Rules
      fileRules: [v => !!v || "File harus diisi"],
      

      // Properties
      accept: [...ACCEPT_IMPORT.PDF]
    };
  },
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        this.$confirm({
          title: "Confirm",
          message: `Are you sure you want to import this member ?`,
          button: {
            no: "No",
            yes: "Yes"
          },
          
        });
      } else {
        this.$refs.form.inputs
          .filter(d => d.errorBucket.length > 0)[0]
          .$el.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest"
          });
      }
    },
    downloadTemp() {
      this.downloadTemplate(
        "/template/template_member_import.csv",
        "template_member_import.csv",
        "forcing"
      );
    },
    // Service
    
    
    
  },

};
</script>
