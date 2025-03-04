export default function CreditDisplay({
	...rest
}: React.ComponentProps<"div">) {
	return (
		<div {...rest}>
			Powered by
			<a href="http://webservice.recruit.co.jp/">
				ホットペッパーグルメ Webサービス
			</a>
		</div>
	);
}
