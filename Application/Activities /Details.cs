using System.Net;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
       


        public class Query : IRequest<Activity> { 
            public Guid Id { get; set; }
        };

        public class Handler : IRequestHandler<Query, Activity>
        {
            private readonly DataContext _cotext;

            public Handler(DataContext cotext)
            {
                _cotext = cotext;

            }
            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _cotext.Activities.FindAsync(request.Id);
            }
        }
    }
}