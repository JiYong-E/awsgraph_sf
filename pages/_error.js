import Link from "next/link";

export default function Error({ statusCode }) {
    return (
        <div id="errorhome">
            <p>
                {statusCode
                ? `An error ${statusCode} occurred on server`
                : "An error occurred on client"}
            </p>
            <p>로그인에서 오류가 나타나시면</p>
            <p>홈으로 돌아가셔서 다시 LOGIN버튼 눌러주세요</p>
            <p>GDD에서 오류가 나타나시면</p>
            <p>GDD를 이용하시기 전에 식물 등록을 해주세요</p>
            <Link href="/" id="tohome">To Home</Link>
        </div> 
    );
  }
