using System.Net;
using Application.Activities.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
       
        public class Query : IRequest<Result<Activity>> { 
            public Guid Id { get; set; }
        };

        public class Handler : IRequestHandler<Query, Result<Activity>>
        {
            private readonly DataContext _cotext;

            public Handler(DataContext cotext)
            {
                _cotext = cotext;

            }
            public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
               var activity =  await _cotext.Activities.FindAsync(request.Id);

               return Result<Activity>.Success(activity);
            }
        }
    }
}