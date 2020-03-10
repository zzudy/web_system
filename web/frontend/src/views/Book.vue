<template>
<div id="book_page">
<div class="pet">
  <Mypet id="mypet"></Mypet>
</div>
  <div class="page">
    <div id="cal">
    <full-calendar :events="events" @event-selected="openEditModal" defaultView="month" />
<b-modal id="add-modal" title="Add Calendar Event" hide-footer ref="add-modal">
      <CalendarForm :edit="false" @eventSaved="closeModal()" />
    </b-modal>
<b-modal id="edit-modal" title="Edit Calendar Event" hide-footer ref="edit-modal">
      <CalendarForm :edit="true" :calendarEvent="calendarEvent" @eventSaved="closeModal()" />
    </b-modal>
    <div class="buttons">
      <b-button v-b-modal.add-modal>Add Calendar Event</b-button>
    </div>
    </div>
  </div>
</div>
</template>
<script>
// @ is an alias to /src
import CalendarForm from "@/components/CalendarForm.vue";
import Mypet from '@/components/Mypet.vue'
import { requestsMixin } from "../../mixins/requestsMixin";
export default {
  name: "home",
  components: {
    CalendarForm,
    Mypet
  },
  mixins: [requestsMixin],
  computed: {
    events() {
      return this.$store.state.events;
    }
  },
  data() {
    return {
      calendarEvent: {}
    };
  },
  async beforeMount() {
    await this.getEvents();
  },
  methods: {
    async getEvents() {
      const response = await this.getCalendar();
      this.$store.commit("setEvents", response.data);
    },
    closeModal() {
      this.$refs["add-modal"].hide();
      this.$refs["edit-modal"].hide();
      this.calendarEvent = {};
    },
    openEditModal(event) {
      let { id, start, end, title } = event;
      this.calendarEvent = { id, start, end, title };
      this.$refs["edit-modal"].show();
    }
  }
};
</script>
<style lang="scss" scoped>

.page{
  float:right;
  width: 75%;
  height: 65%;
}

#cal{
  margin: 30px 10px 30px 0px;
  padding: 30px 10px 30px 0px;
}

#calendar.agenda{
    background-color: #FF9900;
}
.buttons {
  text-align: right;
  margin: 30px 10px 30px 0px;
}
#book_page:after{
  
  content:"";
  position:absolute;
  top: 0;
  left: 0;
  width:100%;
  height: 130%;
  opacity: 0.5;
  z-index: -1;
  background-color:rosybrown;
}


</style>

