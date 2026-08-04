interface Customer {
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
}

interface CustomerCardProps {
  customer: Customer;
}

export default function CustomerCard({
  customer,
}: CustomerCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow p-8">

      <h2 className="text-xl font-semibold text-[#1F2D3D] mb-6">
        Customer
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div>

          <p className="text-sm text-gray-500">
            Full Name
          </p>

          <p className="mt-1 text-lg font-semibold">
            {customer.first_name} {customer.last_name}
          </p>

        </div>

        <div>

          <p className="text-sm text-gray-500">
            Email
          </p>

          <p className="mt-1 font-medium break-all">
            {customer.email}
          </p>

        </div>

        <div>

          <p className="text-sm text-gray-500">
            Phone
          </p>

          <p className="mt-1 font-medium">
            {customer.phone || "Not provided"}
          </p>

        </div>

      </div>

    </div>
  );
}