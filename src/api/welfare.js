import axios from "axios";
import { parseStringPromise } from "xml2js";

const API_BASE =
    "https://apis.data.go.kr/B554287/LocalGovernmentWelfareInformations";
const API_KEY = import.meta.env.VITE_API_KEY;

export async function fetchWelfareList(params = {}) {
    const url = `${API_BASE}/getLocalGovernmentWelfareList`;
    try {
        const response = await axios.get(url, {
            params: {
                serviceKey: API_KEY,
                pageNo: 1,
                numOfRows: 10,
                ...params,
            },
            responseType: "text",
        });
        const parsed = await parseStringPromise(response.data, {
            explicitArray: false,
        });
        return parsed.response.body.items.item || [];
    } catch (error) {
        console.error("지자체 복지 서비스 목록 조회 실패:", error);
        return [];
    }
}
