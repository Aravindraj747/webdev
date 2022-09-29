import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-agent-home',
  templateUrl: './agent-home.component.html',
  styleUrls: ['./agent-home.component.css']
})
export class AgentHomeComponent implements OnInit {

    youtubeVideos: {url: any, title: string}[] = [];

    ngOnInit(): void {
    }

    constructor(private firestore: AngularFirestore) {
        this.firestore.collection<{url: string, title: string}>("youtubeVideos").valueChanges()
            .subscribe(res => {
                console.log(res);
                this.youtubeVideos = res;
            })
    }
}
