import { useEffect, useState } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import './tags.css'

export default function TagInputComponent({ placeholder, name, handleTagsChange, suggestionsFriends, suggestionsLanguages }) {

    const [tags, setTags] = useState([]);
    // console.log({suggestionsFriends})
    // console.log({suggestionsLanguages})

    console.log({ tags });

    useEffect(() => {
        handleTagsChange(tags);
    }, [tags]);

    const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = tag => {
        setTags([...tags, tag]);
    };

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        setTags(newTags);
    };

    const handleTagClick = index => {
        console.log('The tag at index ' + index + ' was clicked');
    };

    return (
        <div>
            {suggestionsFriends ? <ReactTags
                tags={tags}
                suggestions={suggestionsFriends}
                // delimiters={delimiters}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                handleTagClick={handleTagClick}
                inputFieldPosition="bottom"
                autocomplete
                placeholder={placeholder}
                name={name}
            /> :
                <ReactTags
                    tags={tags}
                    suggestions={suggestionsLanguages}
                    // delimiters={delimiters}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    handleDrag={handleDrag}
                    handleTagClick={handleTagClick}
                    inputFieldPosition="bottom"
                    autocomplete
                    placeholder={placeholder}
                    name={name}
                />}
        </div>
    );
}
