import axios from "axios";

export async function fetchPost(){
    const response = await axios.get("https://stagingngls.wpengine.com/wp-json/wp/v2/posts/");
    return response.data;
}