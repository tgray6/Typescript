interface APIResponse<Data = { status: number }> {
  data: Data;
  isError: boolean;
}

interface UserResponse {
  name: string;
  age: number;
}

interface GameResponse {
  title: string;
  score: number;
}

interface StatusResponse {
  status: number;
}

type UserResponseType = APIResponse<UserResponse>;
type GameResponseType = APIResponse<GameResponse>;

const UserResponse: UserResponseType = {
  data: {
    name: "Tyler",
    age: 1000,
  },
  isError: false,
};

const GameResponse: GameResponseType = {
  data: {
    title: "Megaman",
    score: 10,
  },
  isError: false,
};

const StatusResponse: APIResponse = {
  data: {
    status: 401,
  },
  isError: false,
};
