import {
  createUserSelect,
  userRepository,
} from "@/features/users/user.repository";
import { auth } from "./auth";
import { unauthorized } from "./error-handlers";

const sessionValidation = {
  inventory: async () => {
    const currentSession = await auth();

    if (currentSession?.user) return unauthorized("You're not authorized");

    const selectData = createUserSelect({
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
    });

    const user = await userRepository.findUserById(
      currentSession?.user.id!,
      selectData,
    );

    return user;
  },
};

export default sessionValidation;
