export const SUCCESS_MESSAGE = {
  LOGIN: "로그인에 성공하셨습니다.",
  REGISTER: "회원가입에 성공하셨습니다.",
  LOGOUT: "로그아웃에 성공하셨습니다.",
  CHANGE_PROFILE: "회원정보가 변경되었습니다.",
};

export const FAIL_MESSAGE = {
  LOGIN: "로그인에 실패하였습니다.",
  REGISTER: "회원가입에 실패하셨습니다.",
  CHANGE_PROFILE: "회정정보 변경에 실패하였습니다.",
  IMAGE: "이미지 업로드에 실패하셨습니다.",
};

export const ALERT_TYPE = {
  SUCCESS: "success",
  INFO: "info",
  WARNING: "warning",
  ERROR: "error",
};

export const LABEL = {
  LOGIN: "로그인",
  KAKAO_LOGIN: "카카오 로그인",
  LOGOUT: "로그아웃",
  SERVICE_INTRODUCE: "서비스 소개",
  REGISTER: "회원가입",
  NOT_MEMBER: "회원이 아니신가요?",
  ALREADY_MEMBER: "이미 회원이신가요?",
  CONFIRM: "확인",
  CANCLE: "취소",
  PROFILE: "프로필",
  POST: "게시글",
  POSTING: "새 글 작성",
  USER_POST: "작성한 게시글",
  USER_LIKE_POST: "좋아한 게시글",
  USER_EXP: "경험치",
  CHANGE_PROFILE: "프로필 수정",
  CHANGE_IMAGE: "이미지 변경",
  ERROR_INTRODUCE: "THE PAGE YOU REQUESTED COULD NOT FOUND",
  SEARCH: "검색",
  TRAINING: "트레이닝",
  RANKING: "경험치 랭킹",
  POPULARITY: "인기글",
  GET_MORE: "더 보러가기",
  DOT: "점",
  CATEGORY: "카테고리",
  TEST: "테스트",
};

export const GUIDE_MESSAGE = {
  EMAIL: "이메일 형식에 맞지 않습니다.",
  PASSWORD: "비밀번호는 영문 + 숫자 + 8자리 이상입니다.",
  CONFIRM_PASSWORD: "비밀번호가 일치하지 않습니다.",
  NICKNAME: "닉네임은 2글자 이상이어야 합니다.",
  ERROR: "초 후 홈페이지로 이동합니다.",
  SEARCH: "검색어를 입력하세요.",
  NOT_FOUND_AUTO_COMPLETE: "해당하는 단어가 없습니다.",
  KAKAO_CHANGE_INFO: "카카오 유저는 비밀번호를 변경 할 수 없습니다.",
};

export const CATEGORY = {
  ALL: "전체",
  NOVEL: "소설",
  ESSAY: "산문",
  POETRY: "시",
  ETC: "etc",
};

export const TEST_RESULT = {
  LEVEL_ONE:
    "아직 글을 읽으면서 모르는 단어가 많이 나오실 것 같아요!\n문해한 하루의 트레이닝 서비스를 이용해보시겠어요? ",
  LEVEL_TWO:
    "알고 있는 단어를 문장으로 표현하는 연습을 하시면 좋을 것 같습니다.\n트레이닝 서비스를 통해 글에 재미를 붙여봐요!",
  LEVEL_THREE:
    "문해력의 신!!\n이제는 짧은 글이 아니라 목적 있는 글을 쓰면 좋을 것 같습니다.\n트레이닝 3단계부터 시작하는 것을 추천 드려요!",
};

export const TAG_NAME = {
  STEP_ONE: ["step1", "word"],
  STEP_TWO: ["step2", "just the way you are"],
  STEP_THREE: ["step3", "필사"],
  STEP_FOUR: ["step4", "FREE"],
};

export const TRAINING_SUBJECT = {
  LEVEL1_TITLE: "단어 공부하기",
  LEVEL2_TITLE: "나를 소개합니다",
  LEVEL3_TITLE: "필사",
  LEVEL4_TITLE: "요약하기",
};

export const TRAINING_INTRODUNCTION = {
  STEP_ONE:
    "가장 기본은 문장의 의미를 <mark>정확하게 아는 것</mark>이중요합니다.\n간단한 단어 퀴즈를 통해 <mark>어휘력</mark>을 길러봅시다!\n제시된 단어의 뜻을 생각해보세요.",
  STEP_TWO:
    "1단계를 진행하신 여러분! 많이 어려우셨나요?\n본격적인 문해력 훈련에 앞서, 문하생에게 가벼운 <mark>제시어</mark>를 드리고자 합니다.\n본인이 보고 느낀 것을 <mark>그대로</mark> 작성하는 것이 중요합니다.\n외모를 묘사할 수도, 성격을 표현할 수도 있습니다.\n<mark>본인</mark>을 소개하는 글을 작성해보세요!\n취업을 위한 자기소개가 아닙니다. 내가 본 나에 대해 최대한 적어보세요!",
  STEP_FOUR:
    "<mark>필사</mark>는 재밌으셨나요? 지루함을 느끼셨거나, '음?' 하셨다면 매우 정상입니다!\n꾸준히 필사을 하면, 필사 만큼 <mark>재밌는</mark> 일은 없을겁니다!\n이제 혼자 보는 글이 아닌 <mark>타인</mark>을 위한 글, <mark>편지</mark>를 써봅시다.\n누군가를 위한 글을 쓰는 것이 우리의 최종 목표입니다!",
};

export const TRANSCRIPTION_INTRODUCTION = {
  STEP_ONE:
    "1\n<mark>'나'</mark>를 있는 그대로 표현하기는 어떠셨나요?\n이제는 조금 어렵고 힘든 <mark>‘필사’</mark>을 진행하려고 합니다.\n필사는 단순히 글을 따라 쓰는 것이 아니라, 글을 <mark>음미</mark> 하고 몸으로 <mark>체득</mark>하는 것입니다.\n글자 하나하나 써 내려가 보세요. 내가 보지 못 했던 부분이 보이고, 읽지 못 했던 부분이 보이게 됩니다.",
  STEP_TWO:
    "2\n읽고, 또 읽어 끊임없이 생각하며\n<mark>손</mark>으로 직접 쓰다보면 지나쳤던 단어가 눈에 보이고, 문장이 보이고 글 전체가 보이게 됩니다.",
  STEP_THREE:
    "3\n칼럼, 소설, 수필, 연설문, 시\n마음에 드는 글을 골라 <mark>꾸준하게</mark> 써보세요.\n문해한 하루에서는 최신 칼럼을 드립니다. 더 다양한 자료를 찾아보세요",
  STEP_FOUR:
    "4\n필사를 진행하고나서, 마지막에 <mark>나만의 요약</mark>이나, <mark>비평</mark>을 적어보세요.\n더욱 발전된 나를 볼 수 있습니다!",
};

export const LEVEL_MAX_EXP = {
  LEVEL0: 50,
  LEVEL1: 300,
  LEVEL2: 700,
  LEVEL3: 1300,
  LEVEL4: 9999999,
};

export const URI = {
  SORT_LIKE: `&sort[field]=likeCount&sort[type]=desc&`,
  SORT_TITLE: `&sort[field]=title&sort[type]=asc&`,
  SORT_AUTHOR: `&sort[field]=author&sort[type]=asc&`,
};

export const CONSONANT = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];
