import type { Label } from "./label";

export type SearchParams = {
	// キーワード
	keyword?: string;
	// ジャンル
	genres: Label[];
	// コース
	course?: boolean;
	// 飲み放題
	free_drink?: boolean;
	// 食べ放題
	free_food?: boolean;
	// 個室
	private_room?: boolean;
	// クレジット決済可能
	card?: boolean;
	// 禁煙席
	non_smoking?: boolean;
	// ランチ
	lunch?: boolean;
	//子連れ歓迎
	child?: boolean;
	// 位置情報
	position?: GeolocationPosition;
};

export type RestaurantResponse = {
	results: {
		// APIのバージョン
		api_version: string;
		// クエリー条件にマッチする、検索結果の全件数
		results_available: number;
		// 検索結果の件数
		results_returned: string;
		// 検索結果の開始位置
		results_start: number;
		shop: Shop[];
	};
};

export type Shop = {
	// お店ID
	id: string;
	// 掲載店名
	name: string;
	// ロゴ画像
	logo_image: string;
	// 掲載店名かな
	name_kana: string;
	// 住所
	address: string;
	// 最寄駅名
	station_name: string;
	// 携帯用クーポン掲載 0:あり、1:なし
	ktai_coupon: string;
	// 大サービスエリア
	large_service_area: Label;
	// サービスエリア
	service_area: Label;
	// 大エリア
	large_area: Label;
	// 中エリア
	middle_area: Label;
	// 小エリア
	small_area: Label;
	// 緯度（測地系は検索時に指定したもの）
	lat: number;
	// 経度（測地系は検索時に指定したもの）
	lng: number;
	// お店ジャンル
	genre: Label;
	// お店サブジャンル
	sub_genre: Label;
	// ディナー予算
	budget: {
		code: string;
		name: string;
		// 平均ディナー予算
		average: string;
	};
	// 料金備考
	budget_memo: string;
	// お店キャッチ
	catch: string;
	// 総席数
	capacity: number;
	// 交通アクセス
	access: string;
	// 携帯用交通アクセス
	mobile_access: string | undefined;
	// 店舗URL
	urls: {
		pc: string;
	};
	// 写真
	photo: {
		// PC向け
		pc: {
			// 店舗トップ写真(大）画像URL
			l: string;
			// 店舗トップ写真(中）画像URL
			m: string;
			// 店舗トップ写真(小）画像URL
			s: string;
		};
		// 携帯向け
		mobile: {
			// 店舗トップ写真(大）画像URL
			l: string;
			// 店舗トップ写真(小）画像URL
			s: string;
		};
	};
	// 営業時間
	open: string;
	// 定休日
	close: string;
	// 	最大宴会収容人数
	party_capacity: number;
	// WiFi 有無
	wifi: string;
	// ウェディング･二次会
	wedding: string;
	// コース
	course: string;
	// 飲み放題
	free_drink: string;
	// 食べ放題
	free_food: string;
	// 個室
	private_room: string;
	// 掘りごたつ
	horigotatsu: string;
	// 座敷
	tatami: string;
	// カード可
	card: string | undefined;
	// 禁煙席
	non_smoking: string | undefined;
	// 貸切可
	charter: string;
	// 携帯電話OK
	ktai: string;
	// 駐車場
	parking: string;
	// バリアフリー
	barrier_free: string;
	// その他設備
	other_memo: string;
	// ソムリエ
	sommelier: string;
	// オープンエア
	open_air: string;
	// ライブ・ショー
	show: string;
	// エンタメ設備
	equipment: string;
	// カラオケ
	karaoke: string;
	// バンド演奏可
	band: string;
	// TV・プロジェクター
	tv: string;
	// 英語メニュー
	english: string;
	// ペット可
	pet: string;
	// お子様連れ
	child: string;
	// ランチ
	lunch: string;
	// 23時以降も営業
	midnight: string;
	// 備考
	shop_detail_memo: string;
	// クーポンURL
	coupon_urls: {
		pc: string;
		sp: string;
	};
};

export type GenreResponse = {
	results: {
		api_version: string;
		results_available: number;
		results_returned: string;
		results_start: number;
		genre: Label[];
	};
};
