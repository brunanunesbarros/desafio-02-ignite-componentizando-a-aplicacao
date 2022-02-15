import { memo, useState } from "react";
import { Button } from "./Button";

import '../styles/sidebar.scss';

interface GenreResponseProps {
    id: number;
    name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
    title: string;
}

interface SidebarProps {
    genres: GenreResponseProps[];
    handleGenre: (gender: GenreResponseProps) => void;
}

function SidebarComponent(props: SidebarProps) {
    const [selectedGenreId, setSelectedGenreId] = useState(1);

    const handleClickButton = (genre: GenreResponseProps) => {
        props.handleGenre(genre);
        setSelectedGenreId(genre.id);
    }

    return (
        <nav className="sidebar">
            <span>
                Watch<p>Me</p>
            </span>
            <div className="buttons-container">
                {props.genres.map((genre) => (
                    <Button
                        key={String(genre.id)}
                        title={genre.title}
                        iconName={genre.name}
                        onClick={() => handleClickButton(genre)}
                        selected={selectedGenreId === genre.id}
                    />
                ))}
            </div>
        </nav>
    );
}

export const SideBar = memo(SidebarComponent);