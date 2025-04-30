import axios from "axios";

const API_URL =
    "http://openapi.seoul.go.kr:8088/sample/json/fcltOpenInfo_DJ/1/5";

export async function getWelfareFacilities() {
    try {
        const res = await axios.get(API_URL);
        const rows = res.data?.fcltOpenInfo_DJ?.row || [];
        console.log(rows);
        return Array.isArray(rows) ? rows : [rows];
    } catch (error) {
        console.error("API 호출 실패:", error);
        return [];
    }
}
