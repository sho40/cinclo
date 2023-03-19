
export const Banner = () => {
  return (
    <div className="px-4 w-screen bg-gray-400 text-center" style={{height: "60px", lineHeight: "60px"}}>
      <button onClick={() => {"詳細ページへ移動"}}>
        <div className="text-white">CINCLOの使い方バナー</div>
      </button>
    </div>
  )
}
