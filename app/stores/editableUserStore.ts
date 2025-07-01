import { create } from "zustand";

type EditableUser = {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
};

interface UserEditStore {
  edits: Record<string, EditableUser>;
  updateUser: (uuid: string, data: EditableUser) => void;
  getUser: (uuid: string) => EditableUser | undefined;
}

export const useEditableUserStore = create<UserEditStore>((set, get) => ({
  edits: {},
  updateUser: (uuid, data) => {
    set((state) => ({
      edits: {
        ...state.edits,
        [uuid]: data,
      },
    }));
  },
  getUser: (uuid) => get().edits[uuid],
}));
