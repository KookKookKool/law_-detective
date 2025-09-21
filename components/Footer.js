export default function Footer(){
	return (
		<footer className="site-footer w-full bg-gray-50 border-t">
			<div className="container h-full flex items-center justify-between">
				<div className="text-sm text-gray-600">© {new Date().getFullYear()} บริการรับตรวจ</div>
				<div className="text-sm text-gray-600">ติดต่อ: กุ๊กกิ๊ก</div>
			</div>
		</footer>
	)
}
