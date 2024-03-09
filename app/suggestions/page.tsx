import { query } from "@/lib/db";
import styles from "./page.module.css";

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
        <main className={styles.main}>
            <h1>Suggestions</h1>

            <div className={styles.displays}>
                <section className={styles.display}>
                    <h2>Tag</h2>

                    {suggestionResponse.length === 0 ? (
                        <small className={styles.disEmpty}>
                            No suggested tags!
                        </small>
                    ) : (
                        <ul className={styles.suggestions}>
                            {suggestionResponse.map((obj) => (
                                <li key={obj.tag}>
                                    <div className={styles.name}>{obj.tag}</div>
                                    <div className={styles.chance}>
                                        {(
                                            (obj.tag_count / totalCount) *
                                            100
                                        ).toFixed(1)}
                                        %
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>

                <section className={styles.display}>
                    <h2>Personality</h2>

                    {suggestionResponse.length === 0 ? (
                        <small className={styles.disEmpty}>
                            No suggested personalities!
                        </small>
                    ) : (
                        <ul className={styles.suggestions}>
                            {suggestionPersonalityResponse.map((obj) => (
                                <li key={obj.personality}>
                                    <div className={styles.name}>
                                        {obj.personality}
                                    </div>
                                    <div className={styles.chance}>
                                        {(
                                            (obj.personality_count /
                                                totalPersonalityCount) *
                                            100
                                        ).toFixed(1)}
                                        %
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </main>
    );
}
