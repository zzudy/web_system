const APIURL = "";
const axios = require("axios");
export const requestsMixin = {
    methods: {
        getCalendar() {
            console.log("get");
            return axios.get(`${APIURL}/calendar`);
        },
        addCalendar(data) {
            console.log("add" + data);
            console.log("Dd" + data.start);
            return axios.post(`${APIURL}/calendar`, data);
        },
        editCalendar(data) {
            console.log("edit" + data);
            return axios.put(`${APIURL}/calendar/${data.id}`, data);
        },
        deleteCalendar(id) {
            console.log("delete" + id);
            return axios.delete(`${APIURL}/calendar/${id}`);
        }
    }
};