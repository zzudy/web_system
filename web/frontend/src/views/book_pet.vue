<template>
<v-app>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header v-slot="{ open }">
        <v-row no-gutters>
          <v-col cols="5">Pet</v-col>
          <v-col
            cols="7"
            class="text--secondary"
          >
            <v-fade-transition leave-absolute>
              <span
                v-if="open"
                key="0"
              >
                Select your pet
              </span>
              <span
                v-else
                key="1"
              >
                {{ reserve.pet }}
              </span>
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row no-gutters>
          <v-spacer></v-spacer>
          <v-col cols="1">
            <v-select
              v-model="reserve.pet"
              :items="pets"
              chips
              flat
              solo
            ></v-select>
          </v-col>
            <v-spacer></v-spacer>
          <v-divider
            vertical
            class="mx-4"
          ></v-divider>

        </v-row>

      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-header>
        <template v-slot:default="{ open }">
          <v-row no-gutters>
            <v-col cols="4">Purpose</v-col>
            <v-col
              cols="8"
              class="text--secondary"
            >
              <v-fade-transition leave-absolute>
                <span
                  v-if="open"
                  key="0"
                >
                  Enter purpose of treatment
                </span>
                <span
                  v-else
                  key="1"
                >
                  {{ reserve.title }}
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-text-field
          v-model="reserve.title"
          placeholder="주사"
        ></v-text-field>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-header v-slot="{ open }">
        <v-row no-gutters>
          <v-col cols="5">Dates</v-col>
          <v-col
            cols="7"
            class="text--secondary"
          >
            <v-fade-transition leave-absolute>
              <span v-if="open">When do you want to reservation?</span>
              <v-row
                v-else
                no-gutters
                style="width: 100%"
              >
                <v-col cols="6">reserve date: {{ reserve.date || 'Not set' }}</v-col>
              </v-row>
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row
          justify="space-around"
          no-gutters
        >
          <v-col cols="3">
            <v-menu
              ref="startMenu"
              :close-on-content-click="false"
              :return-value.sync="reserve.date"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="reserve.date"
                  label="Reserve date"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.startMenu.isActive = false"
                >Cancel</v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.startMenu.save(date)"
                >OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-header>
        <template v-slot:default="{ open }">
          <v-row no-gutters>
            <v-col cols="5">Time</v-col>
            <v-col
              cols="7"
              class="text--secondary"
            >
              <v-fade-transition leave-absolute>
                <span
                  v-if="open"
                  key="0"
                >
                  Choose appropriate time
                </span>
                <span
                  v-else
                  key="1"
                >
                  {{ reserve.name }}
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row
          justify="space-around"
          no-gutters
        >
        <v-btn
        v-for="time in times"
        v-bind:key="time"
        color="primary"
        dark
        width="100"
        @click.stop="dialog = true"
        @click="reserve.time=time">
        {{time}}
        </v-btn>
        </v-row>
      </v-expansion-panel-content>

      <v-dialog
        v-model="dialog"
        max-width="290">
        <v-card>
            <v-card-title class="headline">예약을 확인합니다.</v-card-title>

            <v-card-text>
                {{reserve.pet}}{{reserve.date}} {{reserve.time}} 예약이 맞습니까?
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

            <v-btn
                color="green darken-1"
                text
                @click="dialog = false">
            Disagree
            </v-btn>

            <v-btn
                color="green darken-1"
                text
                @click="booking" >
            Agree
            </v-btn>
            </v-card-actions>
      </v-card>
     </v-dialog>
    </v-expansion-panel>
    
    
  </v-expansion-panels>
  </v-app>
</template>

<script>
  const scope=this;
  var pet_inform = new Array();
  export default {
    data () {
      return{
      reserve: {
        pet: null,
        title:null,
        date: null,
        time:null,
      },
      date:null,
      dialog: false,
      pets: [],
      times:["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00"],
    }
    },
    created() {
        this.$http.get('/mypet').then((result)=>{
          console.log(result.data)
          pet_inform=result.data;

        for(let i=0;i<pet_inform.length;i++){
          this.pets[i]=pet_inform[i].p_name
        }
        })

    },

    methods:{
    
    booking:function(){
        let i=0;
        for(i=0;i<pet_inform.length;i++){
          if(pet_inform[i].p_name==this.reserve.pet)
            break;
        }
        console.log(this.reserve.date)
        console.log(this.reserve.time)
        console.log(this.reserve.pet)
        console.log(pet_inform[i]._id)
        
        var _title=this.$route.params.hos.title+"에서 "+this.reserve.title
        console.log(_title)
        let start=this.reserve.date+"T"+this.reserve.time+":00.000Z"
        let end=this.reserve.date+"T"+this.reserve.time.substr(0,2)+":59:00.000Z"
        console.log(start)
        console.log(end)

        this.$http.post('/map/book',{
            calendar:{
                start:start,
                end:end,
                title:_title,
            },
            hospital_id:this.$route.params.hos._id,
            pet_id:pet_inform[i]._id,
            
        })

        this.dialog=false
        this.$router.push({
          name:'mypet'
        })
      },
      
  },

  }
</script>
