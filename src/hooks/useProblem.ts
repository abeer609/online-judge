import { useQuery } from "@tanstack/react-query";
import { client } from "../client";
import { type Problem } from "../schema";

const useProblem = (id: string) => {
    return useQuery({
        queryKey: ["problems", id],
        queryFn: () =>
            client
                .get<Problem[]>(`/problems?id=${id}`)
                .then((res) => res.data[0]),
    });
};

export default useProblem;
