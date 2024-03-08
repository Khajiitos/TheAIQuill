import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function SuggestionsPage() {
    interface TagAndCount {
        tag: string;
        tag_count: number;
    }

    interface PersonalityAndCount {
        personality: string;
        personality_count: number;
    }

    const suggestionResponse: TagAndCount[] =
        ((await query(
            "SELECT tag, COUNT(tag) AS tag_count FROM suggestion WHERE tag IS NOT NULL GROUP BY tag",
            []
        )) as Array<TagAndCount>) || [];

    let totalCount = 0;
    suggestionResponse.forEach((obj) => (totalCount += obj.tag_count));

    const suggestionPersonalityResponse: PersonalityAndCount[] =
        ((await query(
            "SELECT personality.personality, COUNT(personality.personality) AS personality_count FROM suggestion_personality JOIN personality ON personality.id = suggestion_personality.personality_id GROUP BY personality",
            []
        )) as Array<PersonalityAndCount>) || [];

    let totalPersonalityCount = 0;
    suggestionPersonalityResponse.forEach(
        (obj) => (totalPersonalityCount += obj.personality_count)
    );

    return (
        <main>
            <h1>Suggestions</h1>

            <div>
                <p>Tag</p>

                {suggestionResponse.length === 0 ? (
                    <p>No suggested tags!</p>
                ) : (
                    <>
                        {suggestionResponse.map((obj) => (
                            <div key={obj.tag}>
                                <div>{obj.tag}</div>
                                <div>
                                    {(
                                        (obj.tag_count / totalCount) *
                                        100
                                    ).toFixed(1)}
                                    %
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>

            <div>
                <p>Personality</p>

                {suggestionResponse.length === 0 ? (
                    <p>No suggested personalities!</p>
                ) : (
                    <>
                        {suggestionPersonalityResponse.map((obj) => (
                            <div key={obj.personality}>
                                <div>{obj.personality}</div>
                                <div>
                                    {(
                                        (obj.personality_count /
                                            totalPersonalityCount) *
                                        100
                                    ).toFixed(1)}
                                    %
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </main>
    );
}
