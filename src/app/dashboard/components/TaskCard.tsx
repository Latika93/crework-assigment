export default function TaskCard({ title, description, status, priority, date }: any) {
    return (
        <div className="p-4 bg-white shadow rounded mb-4">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p>{description}</p>
            <div className="flex justify-between items-center mt-4">
                <span className={`text-xs text-white py-1 px-2 rounded-lg ${priority === 'Urgent' ? 'bg-red-600' : priority === 'Medium' ? 'bg-yellow-600' : 'bg-green-600'}`}>{priority}</span>
                <span className="text-sm text-gray-600">{date}</span>
            </div>
        </div>
    );
}