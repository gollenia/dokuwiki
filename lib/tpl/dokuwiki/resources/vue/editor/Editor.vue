<template>
	<div class="d-flex">
    <div class="edit-wrapper p-4" v-shortkey="['esc']" @shortkey="showLinkPicker = false; showMediaPicker = false; showPageImagePicker = false">
         
                
        <pageimage-picker v-if="showPageImagePicker" @select="insertPageImage($event); showPageImagePicker = false" @close="showPageImagePicker = false"/>

        <div class="">
            
            <div class="input-text">
                <label class="label">Titel</label>
                <input type="text" class="w-100 form-control form-control-lg" v-model="page.title" required>
            </div>
        </div>

       

        <div class="editor max-w-screen-xl border rounded mt-4">
            <div class="mt-4 px-4 bg-gray-200 rounded-tl-xl">
                <div class="btn-toolbar" role="toolbar">
                    <button class="btn btn-light" title="Fetter Text [B]" @click="textWrap('**', '**')" v-shortkey.once="['ctrl', 'b']" @shortkey="textWrap('**', '**')">
                        <i class="material-icons">format_bold</i>
                    </button>
                    <button class="btn btn-light" title="Kursiver Text [I]" @click="textWrap('//', '//')" v-shortkey.once="['ctrl', 'i']" @shortkey="textWrap('//', '//')">
                        <i class="material-icons">format_italic</i>
                    </button>
                    <button class="btn btn-light" title="Unterstrichener Text [U]" @click="textWrap('__', '__')" v-shortkey.once="['ctrl', 'i']" @shortkey="textWrap('__', '__')">
                        <i class="material-icons">format_underlined</i>
                    </button>
                    <button class="btn btn-light" title="Überschrift 1" v-shortkey.once="['ctrl', 'alt', '1']" @shortkey="textWrap('===== ', ' =====')" @click="textWrap('===== ', ' =====')">
                        <i class="material-icons">filter_1</i>
                    </button>
                    <button class="btn btn-light" title="Überschrift 2" v-shortkey.once="['ctrl', 'alt', '2']" @shortkey="textWrap('==== ', ' ====')" @click="textWrap('==== ', ' ====')">
                        <i class="material-icons">filter_2</i>
                    </button>
                    <button class="btn btn-light" title="Überschrift 3" v-shortkey.once="['ctrl', 'alt', '3']" @shortkey="textWrap('=== ', ' ===')" @click="textWrap('=== ', ' ===')">
                        <i class="material-icons">filter_3</i>
                    </button>
                    <button class="btn btn-light" title="Interner Link [L]" @click="showLinkPicker = true" v-shortkey.once="['ctrl', 'l']" @shortkey="showLinkPicker = true">
                        <i class="material-icons">insert_link</i>
                    </button>
                    <button class="btn btn-light" title="Externer Link"  @click="textWrap('[[', ']]', '[[https://www.example.com|Externer Link]]')">
                        <i class="material-icons">explore</i>
                    </button>
                    <button class="btn btn-light" title="Nummerierter Listenpunkt [-]" @click="textWrap('  - ', '', '  - Nummerierter Listenpunkt')" v-shortkey.once="['ctrl', '-']" @shortkey="textWrap('  - ', '', '  - Nummerierter Listenpunkt')">
                        <i class="material-icons">format_list_numbered</i>
                    </button>
                    <button class="btn btn-light" title="Listenpunkt [.]" @click="textWrap('  * ', '', '  * Listenpunkt')" v-shortkey.once="['ctrl', '.']" @shortkey="textWrap('  * ', '', '  * Listenpunkt')">
                        <i class="material-icons">format_list_bulleted</i>
                    </button>
                    <button class="btn btn-light" title="Horizontale Linie" aria-controls="wiki__text" @click="textWrap('\n----\n')">
                        <i class="material-icons">horizontal_rule</i>
                    </button>
                    <button class="btn btn-light" title="Bilder und andere Dateien hinzufügen"  v-shortkey.once="['ctrl', 'm']" @shortkey="showMediaPicker = !showMediaPicker" @click="showMediaPicker = true">
                        <i class="material-icons">insert_photo</i>
                    </button>
                    <button class="btn btn-light" title="Bibelstelle einfügen"  v-shortkey.once="['ctrl', 'shift', 'b']" @shortkey="showBiblePicker = !showBiblePicker" @click="showBiblePicker = true">
                        <i class="material-icons">menu_book</i>
                    </button>
                    <span>
                    <button class="btn btn-light" title="Bibelstelle einfügen"  @click="showBoxSelection = !showBoxSelection">
                        <i class="material-icons">wysiwyg</i>
                    </button>
                    <div v-if="showBoxSelection" class="inline-block mt-10 -ml-14 z-40 absolute bg-gray-100 shadow-md">
                        <ul class="list-style-none p-0">
                            <li @click="textWrap('<WRAP box info>', '</WRAP>'); showBoxSelection = false;" class="cursor-pointer py-2 px-4 hover:bg-gray-300 flex items-center"><i class="mr-4 text-blue-500 material-icons">info</i> Infobox</li>
                            <li @click="textWrap('<WRAP box warning>', '</WRAP>'); showBoxSelection = false;" class="cursor-pointer py-2 px-4 hover:bg-gray-300 flex items-center"><i class="mr-4 text-yellow-400 material-icons">warning</i> Warnung</li>
                            <li @click="textWrap('<WRAP box help>', '</WRAP>'); showBoxSelection = false;" class="cursor-pointer py-2 px-4 hover:bg-gray-300 flex items-center"><i class="mr-4 text-green-500 material-icons">help</i> Hilfe</li>
                            <li @click="textWrap('<WRAP box tip>', '</WRAP>'); showBoxSelection = false;" class="cursor-pointer py-2 px-4 hover:bg-gray-300 flex items-center"><i class="mr-4 text-gray-500 material-icons">privacy_tip</i> Hinweis</li>
                            <li @click="textWrap('<WRAP box error>', '</WRAP>'); showBoxSelection = false;" class="cursor-pointer py-2 px-4 hover:bg-gray-300 flex items-center"><i class="mr-4 text-red-500 material-icons">dangerous</i> Fehler</li>
                        </ul>
                    </div>
                    </span>
                    
                    <button class="btn btn-light" title="Youtube-Video einfügen" v-shortkey.once="['ctrl', 'y']" @shortkey="showVideoSelection = !showVideoSelection" @click="showVideoSelection = true">
                        <i class="material-icons">smart_display</i>
                    </button>
                </div>
            </div>

            <codemirror class="" ref="cm" v-model="page.content" :options="cmOptions" @keyHandled="cmOnKeyHandle($event)"></codemirror>
        </div>
        

        <link-picker v-if="showLinkPicker" @select="insertLink($event); showLinkPicker = false" @close="showLinkPicker = false"/>

        <video-selection v-if="showVideoSelection" @select="insertVideo($event); showVideoSelection = false" @close="showVideoSelection = false"/>

        <link-picker v-if="showPageLinkPicker" @select="setPageLink($event); showLinkPicker = false" @close="showPageLinkPicker = false"/>

        <bible-picker v-if="showBiblePicker" @select="insertBible($event); showBiblePicker = false" @close="showBiblePicker = false"/>

        <media-picker v-if="showMediaPicker" @select="insertMedia($event); showMediaPicker = false" @close="showMediaPicker = false"/>
    </div>
	<header class="inspector ">
		<div class="d-flex justify-content-end gap-2">
			<button class="right btn btn-secondary" v-shortkey="['ctrl', 's']" @shortkey="save" @click="save">Vorschau</button>
			<button class="right btn btn-primary" v-shortkey="['ctrl', 's']" @shortkey="save" @click="save">Speichern</button>
		</div>
		<hr />
		<b class="pb-4 d-block">Beitragsbild</b>
            <img class="object-cover w-100 ratio ratio-16x9" v-if="media.src != '/_media/'" :src="media.src + '?w=600'">
            <div class="d-flex mt-2 gap-2">
            <button class="btn btn-outline-secondary btn-sm d-flex" @click="showPageImagePicker = true"><i class="material-icons">image</i> Ändern</button>
            <button class="btn btn-outline-danger btn-sm d-flex" @click="removePageImage()"><i class="material-icons">delete</i> Löschen</button>
            </div>
			<hr/>
			<b class="pb-4 d-block">Zusammenfassung</b>
			<div class="max-w-screen-xl">
            <div class="input-textarea">
                <textarea class="w-full form-control form-control-sm" rows="5" v-model="page.abstract"></textarea>
                <p class="text-xs text-secondary">Die Zusammenfassung wird als Vortschau auf den Übersichtsseiten angezeigt. Maximal 100 Buchstaben.</p>
            </div>
        	</div>
			<hr/>
			<b class="pb-4 d-block">Taxonomie</b>
            <div class="">
                <div class=" max-w-screen-xl ">
                    <div class="input-text">
                        <label class="label label-sm">Kategorie</label>
                        <input type="text" class="w-full form-control form-control-sm" v-model="page.category">
                        <p class="text-xs text-secondary">Normalerweise die übergeordnete Seite. Umlaute im Zweifelsfall korrigieren.</p>
                    </div>
                </div>
            </div>
			<div class="max-w-screen-xl">
            <div class="editor-tags input-text">
                <label class="label label-sm">Schlagworte</label>
                <input-tag v-model="page.tags" :before-adding="tag => tag.toLowerCase().replace(' ', '_')" placeholder="Tag hinzufügen"></input-tag>
                <p class="text-xs text-secondary">Den wichtigsten Tag zuerst, dieser wird auf der Übersichtsseite angezeigt.</p>
            </div>
        	</div>
			<hr/>
			<b class="pb-4 d-block">Erscheinungsbild</b>
            <div>
                <div class=" max-w-screen-xl">
                    <div class="input-text">
                        <label class="label label-sm">Icon</label>
                        <input type="text" class="w-full form-control form-control-sm" v-model="page.icon">
                        <p class="text-xs text-secondary">Ein beliebiges Icon von <a href="https://fonts.google.com/icons">https://fonts.google.com/icons</a> aus dem "Filled"-Set. Bitte den Namen Kleingeschrieben und mit Unterstrichen angeben</p>
                    </div>
                </div>
            </div>
			<div class="">
                
                <div class="input-text">
                    <label class="label label-sm">Download-Ausnahmen</label>
                    <input type="text" class="w-full  form-control form-control-sm" v-model="page.exclude" required>
                </div>
                <p class="text-xs">Hier können Dateinnamen oder Muster angegeben werden, die nicht in der Downloadliste erscheinen sollen. Mit *.jpg können zb alle Bilder ausgeblendet werden.</p>
            </div>

            <div class="">
                
                <div class="input-text">
                    <label class="label label-sm">Seitenlink</label>
                    <input type="text" @click="showPageLinkPicker = true" class="w-full  form-control form-control-sm" v-model="page.pagelink" required>
                    <p class="text-xs text-secondary">Hier kann ein Link eingefügt werden, der dann als Button im Titelbild angezeigt wird.</p>
                </div>
            </div>
        

        
        
        
        
        

      

            
        
        </header>
	</div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import InputTag from 'vue-input-tag'
import VueShortkey from 'vue-shortkey'
import VueCodemirror from '../../js/codereflector'
import BiblePicker from './BiblePicker.vue'
import LinkPicker from './LinkPicker.vue'
import MediaPicker from './MediaPicker.vue'
import PageimagePicker from './PageimagePicker.vue'
import VideoSelection from './VideoSelection.vue'

import 'codemirror/lib/codemirror.css'

Vue.use(VueCodemirror, {events: ["keyHandled"]})
Vue.use(VueShortkey)

export default {
    name: 'Editor',
    components: {
        InputTag,
        LinkPicker,
        MediaPicker,
        VideoSelection,
        BiblePicker,
        PageimagePicker
    },
    data: () => ({
        cmOptions: {
            tabSize: 4,
            mode: {
                name: 'tiki'
            },
            height: '500px',
            lineNumbers: false,
            line: false,
            lineWrapping: true
        },
        showLinkPicker: false,
        showPageLinkPicker: false,
        showMediaPicker: false,
        showPageImagePicker: false,
        showBiblePicker: false,
        showBoxSelection: false,
        showVideoSelection: false,
        templates: [],
        page: {
            abstract: "",
            content: "",
            date: "",
            template: "",
            exclude: "",
            category: "",
            id: "start",
            pagelink: "",
            minor_change: false,
            pageimage: "",
            summary: "",
            tags: [],
            title: "",
            user: ""
        },
        media: {
            extension: "",
            file: "",
            id: "",
            modified: "",
            path: "",
            size: "",
            src: "",
            thumbnail: "",
            writable: false
        }
    }),
    methods: {
        
        textWrap: function(before = '', after = '', plain = '') {
            const selection = this.$refs.cm.codemirror.getSelection()
            var selectionLength = selection.length; 
            if (selection || !plain) {
                this.$refs.cm.codemirror.replaceSelection(before + selection + after)
            } else {
                this.$refs.cm.codemirror.replaceSelection(plain)
            }
            if(selection.length == 0) {
                var curPos = this.$refs.cm.codemirror.getCursor();
                curPos.ch -= after.length;
                this.$refs.cm.codemirror.setCursor(curPos)
            }
            this.$refs.cm.codemirror.focus()
        },

        setPageLink({ item, title }) {
            this.page.pagelink = item.id + '|' + item.title;
        },
        insertLink ({ item, title }) {
            const selection = this.$refs.cm.codemirror.getSelection()
            const text = title || selection || item.title || item.name
            const link = '[[' + item.id + '|' + text  + ']]'
            this.$refs.cm.codemirror.replaceSelection(link)
        },
        insertVideo ({ videoID }) {
            this.$refs.cm.codemirror.replaceSelection('{{youtube>' + videoID + '?800x400}}')
        },
        insertBible ( {item}) {
            const selection = this.$refs.cm.codemirror.getSelection()
            var verse = item.book.short_name + ":" + item.chapter + "," + item.verses.join(';')
            var title = item.book.long_name + " " + item.chapter + "," + item.verses.join(';')
            if(selection) {
                title = selection
            }
            this.$refs.cm.codemirror.replaceSelection("<bible " + verse + ">" + title + "</bible>")
        },
        cmOnKeyHandle(event) {
            if(event[1] === "Enter") {
                this.newLine();
                console.log("newLine");
            }
        },
        insertMedia ({ item, align, size }) {
            const selection = this.$refs.cm.codemirror.getSelection()
            const text = selection || item.file
            let link = '{{:'
            link += align === 'center' || align === 'right' ? ' ' : ''
            link += item.id
            link += size ? ('?' + size) : ''
            link += align === 'center' || align === 'left' ? ' ' : ''
            link += '|' + text  + '}}'
            this.$refs.cm.codemirror.replaceSelection(link)
        },
        insertPageImage ({ item }) {
            this.page.pageimage = item.id || ''
            axios.get('/?lang=' + window.DOKU_LANG + '&method=get&id=' + this.page.pageimage)
            .then(response => {
                this.media = response.data
            });
        },

        removePageImage() {
            this.page.pageimage = ''
            this.media = {
                extension: "",
                file: "",
                id: "",
                modified: "",
                path: "",
                size: "",
                src: "",
                thumbnail: "",
                writable: false
            }
        },
      
        newLine() {
            var lastLine = this.$refs.cm.codemirror.getCursor()
            
            var lastLineContent = this.$refs.cm.codemirror.getLine(lastLine.line - 1);
            console.log(lastLineContent);
            if (lastLineContent.match(/\s{2,}\*\s/g)) {
                this.$refs.cm.codemirror.replaceSelection("* ")
            }
            if (lastLineContent.match(/\s{2,}\-\s/g)) {
                this.$refs.cm.codemirror.replaceSelection("- ")
            }
        },
        async cancel () {
            window.location.href = '/?lang=' + window.DOKU_LANG + '&id=' + window.DOKU_ID;
        },
        async save () {
            const formData = new FormData()
            formData.append('page', JSON.stringify(this.page))
			console.log('page', this.page)
            await axios.post('/?lang=' + window.DOKU_LANG + '&controller=edit&method=save&id=' + window.DOKU_ID, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then((result) => {console.log(result.data)})

            
        },
        setCategory() {
            var nsLength = this.page.id.split(":").length
            if (nsLength > 2 && this.page.category == "") {
                var category = this.page.id.split(":")[this.page.id.split(":").length - 2 ];
                category = category.charAt(0).toUpperCase() + category.slice(1)
                category = category.replace("_", " ");
                this.page.category = category;
            }
        }
    },
    async created () {
        await axios.get('/?lang=' + window.DOKU_LANG + '&controller=edit&method=get&id=' + window.DOKU_ID)
            .then(response => {
                this.page = response.data
        });

        axios.get('/?lang=' + window.DOKU_LANG + '&controller=media&method=get&id=' + this.page.pageimage)
            .then(response => {
                this.media = response.data
        });

        axios.get('/?lang=' + window.DOKU_LANG + '&controller=edit&method=list&id=system:templates')
            .then(response => {
                this.templates = response.data
        });

        this.setCategory();
        
    }
};
</script>