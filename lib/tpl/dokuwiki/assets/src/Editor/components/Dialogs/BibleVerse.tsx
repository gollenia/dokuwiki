import React, { useContext, useEffect, useRef, useState } from 'react';
import { store } from '../../services/store';
import Combobox from '../Elemets/Combobox';

interface Props {
    onChange: (target: string) => void;
    showBibleVerse: boolean;
    setShowBibleVerse: (show: boolean) => void;
    title: string;
}

type BibleVerseObject = {
    book: number;
    chapter: number;
    verses: Array<number>;
    title: string;
};

const BibleVerse = (props: Props) => {
    const { showBibleVerse, setShowBibleVerse, title, onChange } = props;

    const globalState = useContext(store);

    const {
        state: { article, files, site, lang },
        dispatch,
    } = globalState;

    const bookOptions = site.bible.books.map(book => {
        return { label: book.long_name, value: book.id };
    });

    const [bibleObject, setBibleObject] = useState<BibleVerseObject>({
        book: 0,
        chapter: 1,
        verses: [],
        title: '',
    });

    const [maxVerses, setMaxVerses] = useState(0);
    const titleInput = useRef();

    const getMaxChapters = () => {
        if (!bibleObject.book) return 0;
        const book = site.bible.books.find(i => {
            return i.id == bibleObject.book;
        });
        return book?.chapters;
    };

    useEffect(() => {
        getVerseCount();
    }, [bibleObject]);

    const getVerseCount = () => {
        if (!bibleObject.book || bibleObject.chapter == 0) return 0;
        fetch(
            '/lib/exe/ajax.php?call=versecount&book=' +
                bibleObject.book +
                '&chapter=' +
                bibleObject.chapter +
                '&lang=' +
                lang
        )
            .then(response => response.json())
            .then(data => setMaxVerses(data));
    };

    const toggleVerse = (index: number, event: any) => {
        let verses = bibleObject.verses.includes(index)
            ? bibleObject.verses.filter(i => i !== index)
            : [...bibleObject.verses, index];

        setBibleObject(bible => {
            return { ...bible, verses };
        });
    };

    const clickOk = () => {
        const bookShortName = site.bible.books.find(book => book.id == bibleObject.book).short_name;
        onChange(
            `<bible verse="${bookShortName}${bibleObject.chapter}:${bibleObject.verses.join(',')}">${
                bibleObject.title ?? getTitle()
            }</bible>`
        );
        setShowBibleVerse(false);
    };

    const versesToString = (verses: Array<number>) => {
        if (verses.length == 0) return '';
        if (verses.length == 1) return verses[0];
        verses.sort();
        let versstring: string = verses[0]?.toString();
        verses.forEach((verse, index) => {
            if (index == 0) return;
            if (verse == verses[index - 1] + 1) {
                versstring += versstring.at(-1) !== '-' ? '-' : '';
                return;
            }
            if (versstring.at(-1) === '-') versstring += verses[index - 1];
            versstring += ';' + verse;
        });
        if (versstring.at(-1) === '-') versstring += verses[verses.length - 1];
        return versstring;
    };

    const getTitle = () => {
        const book = bookOptions.find(book => book.value == bibleObject.book)?.label ?? '';
        return book + ' ' + bibleObject.chapter + ',' + versesToString(bibleObject.verses);
    };

    return (
        <>
            <div
                className={'modal modal-sm fade ' + (showBibleVerse ? 'show' : '')}
                style={{ display: showBibleVerse ? 'block' : '' }}
                id="exampleModal"
                aria-labelledby="exampleModalLabel"
                aria-modal={showBibleVerse}
                role="dialog"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Bibelstelle
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={() => {
                                    setShowBibleVerse(false);
                                }}
                            ></button>
                        </div>
                        <div className="container">
                            <div className="mb-4">
                                <label>Titel</label>
                                <input className="form-control" placeholder={getTitle()} ref={titleInput} />
                            </div>
                            <div>
                                <div className="d-flex gap-4">
                                    <div>
                                        <label>Buch</label>
                                        <Combobox
                                            placeholder="Buch wählen"
                                            onChange={item => {
                                                setBibleObject(bible => {
                                                    return { ...bible, book: +item, verses: [] };
                                                });
                                            }}
                                            options={bookOptions}
                                        />
                                    </div>
                                    <div>
                                        <label>Kapitel</label>
                                        <input
                                            max={getMaxChapters()}
                                            value={bibleObject.chapter}
                                            onChange={event =>
                                                setBibleObject(bible => {
                                                    return {
                                                        ...bible,
                                                        chapter: parseInt(event.target.value),
                                                        verses: [],
                                                    };
                                                })
                                            }
                                            type="number"
                                            className="form-control"
                                            style={{ width: '5rem' }}
                                        />
                                    </div>
                                </div>
                                <div className="verses">
                                    {maxVerses &&
                                        Array.from(Array(maxVerses).keys()).map(index => {
                                            index++;

                                            return (
                                                <>
                                                    <span
                                                        className={
                                                            'badge ' +
                                                            (bibleObject.verses.includes(index)
                                                                ? 'bg-primary text-white'
                                                                : 'bg-white text-black')
                                                        }
                                                        key={index}
                                                        onClick={event => {
                                                            toggleVerse(index, event);
                                                        }}
                                                    >
                                                        {index}
                                                    </span>
                                                </>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                onClick={() => {
                                    setShowBibleVerse(false);
                                }}
                                className="btn btn-secondary"
                            >
                                Abbrechen
                            </button>
                            <button className="btn btn-primary" onClick={() => clickOk()}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showBibleVerse && <div className="modal-backdrop fade show"></div>}
        </>
    );
};

export default BibleVerse;
