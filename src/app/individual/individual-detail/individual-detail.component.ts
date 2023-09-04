import { Component, OnInit } from '@angular/core';
import { Individual } from 'src/app/components/individual/individual.component';
import {
  AnilistSearchMangaResponse,
  AnilistService,
} from 'src/app/services/anilist.service';
import { AppStateService } from 'src/app/services/app-state.service';
import { ComickService } from 'src/app/services/comick.service';
import { Theme } from 'src/app/theme';
import { Util } from 'src/app/util';

@Component({
  selector: 'app-individual-detail',
  templateUrl: './individual-detail.component.html',
  styleUrls: ['./individual-detail.component.css'],
})
export class IndividualDetailComponent implements OnInit {
  theme = Theme;
  util = Util;

  individual: Individual | null = null;

  constructor(
    private appState: AppStateService,
    private comickService: ComickService,
    private anilistService: AnilistService
  ) {}

  async ngOnInit(): Promise<void> {
    this.individual = this.appState.individual;
    const data: AnilistSearchMangaResponse =
      await this.anilistService.searchManga(
        this.individual?.title.toLowerCase() || ''
      );

    const match = data.data.Page.media.find(
      (d) =>
        d.title['romaji']?.toLowerCase() ===
        this.individual?.title.toLowerCase()
    );
    if (match && this.individual?.rating) {
      this.individual.rating = {
        ...this.individual?.rating,
        anilist: match.averageScore / 10,
      };
    }
  }
}
