const Loading = ({ text = 'Loading...' }) => {
    return (
        <div className="flex flex-col items-center justify-center py-10 text-gray-600">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-sm font-medium">{text}</p>
        </div>
    );
};

export default Loading;
